import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRoutes from './routes/users';
import songsRoutes from './routes/songs';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/songs', songsRoutes);

app.listen(5000, () => {
    console.log('Serwer działa na porcie 5000');
});
