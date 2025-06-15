import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db';
import { RowDataPacket } from 'mysql2';

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
        const isMatch = await bcrypt.compare(password, storedHash);

        if (!isMatch) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }

        const [favRows] = await db.query('SELECT idSong FROM favourites WHERE idUser = ?', [user.idUser]);
        const favourites = (favRows as RowDataPacket[]).map((row) => row.idSong);

        const { password_hash, ...userWithoutPassword } = user;

        const token = jwt.sign(
            {
                idUser: user.idUser,
                username: user.username,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' },
        );

        res.json({
            token,
            user: userWithoutPassword,
            favourites,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
