import express from 'express';
import cors from 'cors';
import path from 'path';
import 'dotenv/config';
import { db } from './db';
import cron from 'node-cron';

declare const PhusionPassenger: any;

if (typeof PhusionPassenger !== 'undefined') {
    PhusionPassenger.configure({ autoInstall: false });
}

import userRoutes from './routes/users';
import songsRoutes from './routes/songs';

const app = express();
app.disable('x-powered-by');

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/songs', songsRoutes);

app.use(express.static(path.join(__dirname, 'public')));

(async () => {
    try {
        const [rows] = await db.query('SELECT 1');
        console.log('✅ Połączono z bazą danych!');
    } catch (err) {
        console.error('❌ Błąd połączenia z bazą danych:', err);
    }
})();

cron.schedule('0 */2 * * *', async () => {
    try {
        await db.query('DELETE FROM songs WHERE deleted_by_idUser IS NOT NULL');
    } catch (err) {
        console.error('Błąd podczas usuwania utworów z kosza:', err);
    }
});

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

if (typeof PhusionPassenger !== 'undefined') {
    app.listen('passenger');
} else {
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

exports.default = app;
