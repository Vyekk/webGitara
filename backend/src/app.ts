import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { db } from './db';
import cron from 'node-cron';
import cookieParser from 'cookie-parser';

(() => {
    const envName = process.env.NODE_ENV || 'development';
    const candidates = [
        path.resolve(process.cwd(), `.env.${envName}`),
        path.resolve(process.cwd(), '.env'),
        path.resolve(__dirname, `../.env.${envName}`),
        path.resolve(__dirname, '../.env'),
        path.resolve(__dirname, `../../.env.${envName}`),
        path.resolve(__dirname, '../../.env'),
    ];
    for (const p of candidates) {
        if (fs.existsSync(p)) {
            dotenv.config({ path: p });
            break;
        }
    }
})();

declare const PhusionPassenger: undefined | { configure: (opts: { autoInstall: boolean }) => void };

const USE_PASSENGER = (process.env.USE_PASSENGER || 'false').toLowerCase() === 'true';
if (USE_PASSENGER && typeof PhusionPassenger !== 'undefined') {
    PhusionPassenger.configure({ autoInstall: false });
}

import userRoutes from './routes/users';
import songsRoutes from './routes/songs';

const app = express();
app.disable('x-powered-by');

// Configure CORS based on environment (allow comma-separated origins)
const corsOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000,http://127.0.0.1:3000')
    .split(',')
    .map((o) => o.trim().replace(/\/$/, '')) // strip trailing slash
    .filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            const normalized = origin ? origin.replace(/\/$/, '') : '';
            if (!normalized) return callback(null, true); // non-browser or same-origin
            if (corsOrigins.includes(normalized)) return callback(null, true);
            console.warn(`[CORS] Blocked origin: ${normalized}. Allowed: ${corsOrigins.join(', ')}`);
            return callback(new Error('Not allowed by CORS'));
        },
        credentials: true,
    }),
);
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/songs', songsRoutes);

app.use(express.static(path.join(__dirname, 'public')));

(async () => {
    try {
        await db.query('SELECT 1');
        console.log('✅ Połączono z bazą danych!');
    } catch (err) {
        console.error('❌ Błąd połączenia z bazą danych:', err);
    }
})();

cron.schedule('0 */2 * * *', async () => {
    try {
        console.log('Czyszczenie usuniętych utworów z kosza...');
        await db.query('DELETE FROM songs WHERE deleted_by_idUser IS NOT NULL');
        console.log('Usunięte utwory zostały wyczyszczone.');
    } catch (err) {
        console.error('Błąd podczas czyszczenia utworów z kosza:', err);
    }
});

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

if (USE_PASSENGER && typeof PhusionPassenger !== 'undefined') {
    app.listen('passenger');
    console.log('Server is running under Phusion Passenger');
} else {
    const PORT = Number(process.env.PORT) || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
export default app;
