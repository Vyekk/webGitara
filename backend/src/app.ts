import express from 'express';
import cors from 'cors';
import path from 'path';
import 'dotenv/config';
import { db } from './db';
import cron from 'node-cron';
import cookieParser from 'cookie-parser';

declare const PhusionPassenger: undefined | { configure: (opts: { autoInstall: boolean }) => void };

const USE_PASSENGER = (process.env.USE_PASSENGER || 'false').toLowerCase() === 'true';
if (USE_PASSENGER && typeof PhusionPassenger !== 'undefined') {
    PhusionPassenger.configure({ autoInstall: false });
}

import userRoutes from './routes/users';
import songsRoutes from './routes/songs';

const app = express();
app.disable('x-powered-by');

const corsOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            if (corsOrigins.includes(origin)) return callback(null, true);
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

// Start server depending on runtime (Passenger or Node)
if (USE_PASSENGER && typeof PhusionPassenger !== 'undefined') {
    // Passenger will manage the socket; use the special 'passenger' name
    app.listen('passenger');
    console.log('Server is running under Phusion Passenger');
} else {
    const PORT = Number(process.env.PORT) || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
export default app;
