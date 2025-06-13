import 'dotenv/config';
import express, { Request, Response } from 'express';
import mysql from 'mysql2';
import cors from 'cors';

// Typowanie zmiennych środowiskowych
interface ProcessEnv {
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
}

const app = express();
app.use(cors());
app.use(express.json());

// Typowanie połączenia z bazą
const db = mysql.createConnection({
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
});

// Łączenie z bazą
db.connect((err) => {
    if (err) {
        console.error('Błąd połączenia z bazą:', err);
        return;
    }
    console.log('Połączono z bazą MySQL');
});

// Typowanie zapytania GET
app.get('/users', (req: Request, res: Response) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Błąd pobierania danych' });
            return;
        }
        res.json(results);
    });
});

app.listen(5000, () => {
    console.log('Serwer działa na porcie 5000');
});
