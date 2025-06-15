// src/controllers/usersController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db';
import { RowDataPacket } from 'mysql2';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password, email } = req.body;

    const [existing] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if ((existing as RowDataPacket[]).length > 0) {
        res.status(400).json({ error: 'Username already exists' });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const idUser = uuidv4();

    await db.query(
        `INSERT INTO users (
            idUser, username, password_hash, email, isAdmin, isModerator, isActivated,
            average_published_song_rating, number_of_ratings_received
        ) VALUES (?, ?, ?, ?, 0, 0, 1, 0, 0)`,
        [idUser, username, hashedPassword, email],
    );

    res.status(201).json({ message: 'User registered successfully', idUser });
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        const user = (rows as RowDataPacket[])[0];

        if (!user) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }

        const storedHash = user.password_hash.trim();
        const match = await bcrypt.compare(password, storedHash);

        if (!match) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign(
            {
                idUser: user.idUser,
                username: user.username,
                isAdmin: user.isAdmin,
                isModerator: user.isModerator,
            },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' },
        );

        res.json({ message: 'Login successful', user, token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updatePassword = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const userId = req.user.idUser;
    const { oldPassword, newPassword } = req.body;

    const [rows] = await db.query('SELECT * FROM users WHERE idUser = ?', [userId]);
    const user = (rows as RowDataPacket[])[0];

    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isMatch) {
        res.status(400).json({ error: 'Old password is incorrect' });
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

    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
};

export const getUserById = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM users WHERE idUser = ?', [id]);
    const user = (rows as RowDataPacket[])[0];

    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }

    res.json(user);
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

    let isAdmin = 0;
    let isModerator = 0;
    if (role === 'admin') isAdmin = 1;
    else if (role === 'moderator') isModerator = 1;

    try {
        const [result]: any = await db.query('UPDATE users SET isAdmin = ?, isModerator = ? WHERE idUser = ?', [
            isAdmin,
            isModerator,
            id,
        ]);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({ message: 'User role updated successfully' });
    } catch (err) {
        console.error('Błąd podczas zmiany roli użytkownika:', err);
        res.status(500).json({ error: 'Błąd serwera' });
    }
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
