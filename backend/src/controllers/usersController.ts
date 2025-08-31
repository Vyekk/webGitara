// src/controllers/usersController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db';
import { getTransporter } from '../utils/mailer';

// Zwraca aktualnie zalogowanego użytkownika na podstawie tokena JWT
export const getCurrentUser = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const [rows] = await db.query(
            'SELECT idUser, username, email, isActivated, created_at, average_published_song_rating, number_of_ratings_received FROM users WHERE idUser = ?',
            [req.user.idUser],
        );
        const user = (rows as RowDataPacket[])[0];
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const roles = await getUserRoles(user.idUser);
        res.json({ user: { ...user, roles } });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getUserRoles = async (idUser: string): Promise<string[]> => {
    const [rows] = await db.query(
        `SELECT r.name FROM users_roles ur
         JOIN roles r ON ur.idRole = r.idRole
         WHERE ur.idUser = ?`,
        [idUser],
    );
    return (rows as { name: string }[]).map((r) => r.name);
};
import { RowDataPacket } from 'mysql2';
import jwt from 'jsonwebtoken';

// Helper: get idTokenType by name
async function getTokenTypeIdByName(name: string): Promise<string | null> {
    const [rows] = await db.query('SELECT idTokenType FROM tokens_types WHERE name = ?', [name]);
    const row = (rows as RowDataPacket[])[0];
    return row ? row.idTokenType : null;
}

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password, email } = req.body;

    const [existing] = await db.query('SELECT idUser FROM users WHERE username = ? LIMIT 1', [username]);
    if ((existing as RowDataPacket[]).length > 0) {
        res.status(400).json({ error: 'Taki nick już istnieje' });
        return;
    }

    const [existingEmail] = await db.query('SELECT idUser FROM users WHERE email = ? LIMIT 1', [email]);
    if ((existingEmail as RowDataPacket[]).length > 0) {
        res.status(400).json({ error: 'Konto z tym adresem email już istnieje' });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const idUser = uuidv4();
    const activationToken = uuidv4();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    try {
        await db.query(
            `INSERT INTO users (
                idUser, username, password_hash, email, isActivated,
                average_published_song_rating, number_of_ratings_received
            ) VALUES (?, ?, ?, ?, 0, 0, 0)`,
            [idUser, username, hashedPassword, email],
        );

        const idTokenType = await getTokenTypeIdByName('activation');
        await db.query('INSERT INTO tokens (idToken, idUser, idTokenType, token, expires_at) VALUES (?, ?, ?, ?, ?)', [
            uuidv4(),
            idUser,
            idTokenType,
            activationToken,
            expiresAt,
        ]);
    } catch (err: any) {
        if (err.code === 'ER_DUP_ENTRY' && err.message.includes('unique_email')) {
            res.status(400).json({ error: 'Konto z tym adresem email już istnieje' });
            return;
        }
        if (err.code === 'ER_DUP_ENTRY' && err.message.includes('username')) {
            res.status(400).json({ error: 'Taki nick już istnieje' });
            return;
        }
        res.status(500).json({ error: 'Błąd serwera przy rejestracji użytkownika.' });
        return;
    }

    const [roleRows] = await db.query('SELECT idRole FROM roles WHERE name = ?', ['user']);
    const userRole = (roleRows as RowDataPacket[])[0];
    if (userRole) {
        await db.query(
            'INSERT INTO users_roles (idUserRole, idUser, idRole, assigned_at, assigned_by) VALUES (?, ?, ?, NOW(), NULL)',
            [uuidv4(), idUser, userRole.idRole],
        );
    }

    try {
        const transporter = getTransporter();
        const activationUrl = `${process.env.CORS_ORIGIN}/activate?token=${activationToken}`;

        await transporter.sendMail({
            from: 'support@konradkoluch.usermd.net',
            to: email,
            subject: 'Aktywacja konta w WebGitara',
            html: `
                <div style="max-width:500px;margin:40px auto;padding:32px 24px;background:#fff;border:1px solid #ddd;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.2);font-family:sans-serif;">
                    <h2 style="color:#2d3748;text-align:center;margin-bottom:24px;">Witaj w WebGitara!</h2>
                    <p style="font-size:16px;color:#333;text-align:center;">Dziękujemy za rejestrację.<br>Aktywuj swoje konto, klikając poniższy przycisk:</p>
                    <div style="text-align:center;margin:32px 0;">
                        <a href="${activationUrl}" style="display:inline-block;padding:14px 32px;background:#f5513b;color:#fff;font-size:18px;border-radius:6px;text-decoration:none;font-weight:bold;box-shadow:0 2px 8px rgba(0,0,0,0.2);">Aktywuj konto</a>
                    </div>
                    <p style="font-size:14px;color:#666;text-align:center;">Jeśli nie rejestrowałeś się w serwisie WebGitara, zignoruj tę wiadomość.</p>
                    <hr style="margin:32px 0;border:none;border-top:1px solid #eee;">
                    <div style="font-size:12px;color:#aaa;text-align:center;">&copy; ${new Date().getFullYear()} webGitara</div>
                </div>
            `,
        });
    } catch (err) {
        console.error('Błąd wysyłki maila:', err);
    }

    res.status(201).json({
        message: 'Rejestracja udana. Sprawdź email i aktywuj konto.',
        idUser,
    });
};

export const activateUser = async (req: Request, res: Response) => {
    const { token } = req.body;
    const idTokenType = await getTokenTypeIdByName('activation');
    const [rows] = await db.query(
        'SELECT idToken, idUser FROM tokens WHERE token = ? AND idTokenType = ? AND used = FALSE AND expires_at > NOW()',
        [token, idTokenType],
    );
    const tokenRow = (rows as any[])[0];
    if (!tokenRow) {
        return res.status(400).json({ error: 'Nieprawidłowy lub przeterminowany token aktywacyjny' });
    }
    await db.query('UPDATE users SET isActivated = 1 WHERE idUser = ?', [tokenRow.idUser]);
    await db.query('UPDATE tokens SET used = TRUE WHERE idToken = ?', [tokenRow.idToken]);
    res.json({ message: 'Konto zostało aktywowane!' });
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.query(
            'SELECT idUser, username, email, isActivated, created_at, average_published_song_rating, number_of_ratings_received, password_hash FROM users WHERE username = ? OR email = ?',
            [username, username],
        );
        const user = (rows as RowDataPacket[])[0];

        if (!user) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }

        if (!user.isActivated) {
            res.status(403).json({ error: 'Konto nieaktywne, sprawdź email.' });
            return;
        }

        const storedHash = user.password_hash.trim();
        const match = await bcrypt.compare(password, storedHash);

        if (!match) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }

        const roles = await getUserRoles(user.idUser);

        const token = jwt.sign(
            {
                idUser: user.idUser,
                username: user.username,
                roles,
            },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' },
        );

        const isProd = (process.env.NODE_ENV || 'development') === 'production';
        res.cookie('token', token, {
            httpOnly: true,
            secure: isProd, // only secure over https in production
            sameSite: isProd ? 'none' : 'lax', // allow cross-site cookies when using separate domains in prod
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ message: 'Login successful', user: { ...user, roles } });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });
    res.json({ message: 'Logout successful' });
};

export const updatePassword = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const userId = req.user.idUser;
    const { oldPassword, newPassword } = req.body;

    const [rows] = await db.query('SELECT idUser, password_hash FROM users WHERE idUser = ?', [userId]);
    const user = (rows as RowDataPacket[])[0];

    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isMatch) {
        res.status(400).json({ error: 'Stare hasło jest nieprawidłowe' });
        return;
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await db.query('UPDATE users SET password_hash = ? WHERE idUser = ?', [hashed, userId]);

    res.json({ message: 'Password updated successfully' });
};

export const getAllUsers = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const [rows] = await db.query(
        'SELECT idUser, username, email, isActivated, created_at, average_published_song_rating, number_of_ratings_received FROM users',
    );
    const users = rows as RowDataPacket[];

    const [rolesRows] = await db.query(`
        SELECT ur.idUser, r.name as roleName
        FROM users_roles ur
        JOIN roles r ON ur.idRole = r.idRole
    `);
    const rolesMap: Record<string, string[]> = {};
    (rolesRows as { idUser: string; roleName: string }[]).forEach(({ idUser, roleName }) => {
        if (!rolesMap[idUser]) rolesMap[idUser] = [];
        rolesMap[idUser].push(roleName);
    });

    const usersWithRoles = users.map((u) => ({
        ...u,
        roles: rolesMap[u.idUser] || [],
    }));

    res.json(usersWithRoles);
};

export const getUserById = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const { id } = req.params;
    const [rows] = await db.query(
        'SELECT idUser, username, email, isActivated, created_at, average_published_song_rating, number_of_ratings_received FROM users WHERE idUser = ?',
        [id],
    );
    const user = (rows as RowDataPacket[])[0];

    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }

    const [rolesRows] = await db.query(
        `SELECT r.name FROM users_roles ur JOIN roles r ON ur.idRole = r.idRole WHERE ur.idUser = ?`,
        [id],
    );
    const roles = (rolesRows as { name: string }[]).map((r) => r.name);
    res.json({ ...user, roles });
};

export const updateUserStats = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const { id } = req.params;

    const [ratings] = await db.query(
        `
        SELECT s.idUser, r.rating
        FROM songs s
        JOIN ratings r ON s.idSong = r.idSong
        WHERE s.idUser = ?
        `,
        [id],
    );

    const ratingData = ratings as { rating: number }[];
    const total = ratingData.reduce((sum, r) => sum + r.rating, 0);
    const count = ratingData.length;
    const avg = count ? total / count : 0;

    await db.query(
        `UPDATE users SET average_published_song_rating = ?, number_of_ratings_received = ? WHERE idUser = ?`,
        [avg, count, id],
    );

    res.json({ message: 'User stats updated', average: avg, count });
};

export const updateAllUsersStats = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const [rows] = await db.query(`
        SELECT s.idUser, r.rating
        FROM songs s
        JOIN ratings r ON s.idSong = r.idSong
    `);

    const ratings = rows as { idUser: string; rating: number }[];
    const userMap: Record<string, { total: number; count: number }> = {};

    for (const r of ratings) {
        if (!userMap[r.idUser]) userMap[r.idUser] = { total: 0, count: 0 };
        userMap[r.idUser].total += r.rating;
        userMap[r.idUser].count += 1;
    }

    const updates = Object.entries(userMap).map(([idUser, { total, count }]) =>
        db.query(
            'UPDATE users SET average_published_song_rating = ?, number_of_ratings_received = ? WHERE idUser = ?',
            [total / count, count, idUser],
        ),
    );

    await Promise.all(updates);
    res.json({ message: 'All users stats updated' });
};

export const updateUserFavourites = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const { favourites } = req.body;

    if (!Array.isArray(favourites)) {
        res.status(400).json({ error: 'Brak poprawnej listy favourites' });
        return;
    }

    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        await conn.query('DELETE FROM favourites WHERE idUser = ?', [userId]);

        if (favourites.length > 0) {
            const values = favourites.map((idSong: string) => [uuidv4(), userId, idSong]);
            await conn.query('INSERT INTO favourites (idFavourite, idUser, idSong) VALUES ?', [values]);
        }

        await conn.commit();
        res.status(200).json({ success: true });
    } catch (err) {
        await conn.rollback();
        res.status(500).json({ error: 'Błąd aktualizacji ulubionych' });
    } finally {
        conn.release();
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const [result]: any = await db.query('DELETE FROM users WHERE idUser = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Błąd podczas usuwania użytkownika:', err);
        res.status(500).json({ error: 'Błąd serwera' });
    }
};

export const updateUserRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { role } = req.body; // role: 'admin' | 'moderator' | 'user'

    const [roleRows] = await db.query('SELECT idRole FROM roles WHERE name = ?', [role]);
    const roleRow = (roleRows as any[])[0];
    if (!roleRow) {
        return res.status(400).json({ error: 'Nieprawidłowa rola' });
    }

    await db.query('DELETE FROM users_roles WHERE idUser = ?', [id]);

    const assignedBy = req.user?.idUser || null;
    await db.query(
        'INSERT INTO users_roles (idUserRole, idUser, idRole, assigned_at, assigned_by) VALUES (?, ?, ?, NOW(), ?)',
        [uuidv4(), id, roleRow.idRole, assignedBy],
    );

    res.json({ message: 'User role updated successfully' });
};

export const getUserFavourites = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
        const [rows] = await db.query('SELECT idSong FROM favourites WHERE idUser = ?', [userId]);
        const favourites = (rows as { idSong: string }[]).map((row) => row.idSong);
        res.json(favourites);
    } catch (err) {
        res.status(500).json({ error: 'Błąd pobierania favourites' });
    }
};

export const getUserReportedSongs = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ error: 'userId required' });
    }
    try {
        const [rows] = await db.query('SELECT idSong FROM reported_songs WHERE reported_by = ?', [userId]);
        const reportedSongs = (rows as { idSong: string }[]).map((row) => row.idSong);
        return res.status(200).json(reportedSongs);
    } catch (err) {
        console.error('Błąd pobierania reportedSongs:', err);
        return res.status(500).json({ error: 'Błąd pobierania reportedSongs' });
    }
};

export const updateUserReportedSongs = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const { reportedSongs } = req.body;
    if (!Array.isArray(reportedSongs)) {
        res.status(400).json({ error: 'Brak poprawnej listy reportedSongs' });
        return;
    }
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        await conn.query('DELETE FROM reported_songs WHERE reported_by = ?', [userId]);
        if (reportedSongs.length > 0) {
            const values = reportedSongs.map((idSong: string) => [uuidv4(), idSong, userId]);
            await conn.query('INSERT INTO reported_songs (idReportedSong, idSong, reported_by) VALUES ?', [values]);
        }
        await conn.commit();
        res.status(200).json({ success: true });
    } catch (err) {
        await conn.rollback();
        res.status(500).json({ error: 'Błąd aktualizacji reportedSongs' });
    } finally {
        conn.release();
    }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
    const { email } = req.body;
    const [rows] = await db.query('SELECT idUser, email FROM users WHERE email = ?', [email]);
    const user = (rows as RowDataPacket[])[0];
    if (!user) {
        return res.json({ message: 'Jeśli konto istnieje, wysłano link do resetu hasła.' });
    }
    const resetToken = uuidv4();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1h
    const idTokenType = await getTokenTypeIdByName('password_reset');
    await db.query('INSERT INTO tokens (idToken, idUser, idTokenType, token, expires_at) VALUES (?, ?, ?, ?, ?)', [
        uuidv4(),
        user.idUser,
        idTokenType,
        resetToken,
        expiresAt,
    ]);
    const transporter = getTransporter();
    const resetUrl = `${process.env.CORS_ORIGIN}/reset-password?token=${resetToken}`;
    await transporter.sendMail({
        from: 'support@konradkoluch.usermd.net',
        to: email,
        subject: 'Resetowanie hasła w WebGitara',
        html: `
            <div style="max-width:500px;margin:40px auto;padding:32px 24px;background:#fff;border:1px solid #ddd;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.2);font-family:sans-serif;">
                <h2 style="color:#2d3748;text-align:center;margin-bottom:24px;">Resetowanie hasła</h2>
                <p style="font-size:16px;color:#333;text-align:center;">Kliknij poniższy przycisk, aby ustawić nowe hasło:</p>
                <div style="text-align:center;margin:32px 0;">
                    <a href="${resetUrl}" style="display:inline-block;padding:14px 32px;background:#f5513b;color:#fff;font-size:18px;border-radius:6px;text-decoration:none;font-weight:bold;box-shadow:0 2px 8px rgba(0,0,0,0.2);">Resetuj hasło</a>
                </div>
                <p style="font-size:14px;color:#666;text-align:center;">Jeśli nie prosiłeś o reset hasła, zignoruj tę wiadomość.</p>
                <hr style="margin:32px 0;border:none;border-top:1px solid #eee;">
                <div style="font-size:12px;color:#aaa;text-align:center;">&copy; ${new Date().getFullYear()} webGitara</div>
            </div>
        `,
    });
    res.json({ message: 'Jeśli konto istnieje, wysłano link do resetu hasła.' });
};

export const resetPassword = async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;
    const idTokenType = await getTokenTypeIdByName('password_reset');
    const [rows] = await db.query(
        'SELECT idToken, idUser FROM tokens WHERE token = ? AND idTokenType = ? AND used = FALSE AND expires_at > NOW()',
        [token, idTokenType],
    );
    const tokenRow = (rows as any[])[0];
    if (!tokenRow) {
        return res.status(400).json({ error: 'Nieprawidłowy lub przeterminowany token resetu hasła' });
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password_hash = ? WHERE idUser = ?', [hashed, tokenRow.idUser]);
    await db.query('UPDATE tokens SET used = TRUE WHERE idToken = ?', [tokenRow.idToken]);
    res.json({ message: 'Hasło zostało zresetowane.' });
};
