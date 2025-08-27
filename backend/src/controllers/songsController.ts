import { Response as ExpressResponse } from 'express';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db';
import { Song, Comment, Tablature } from '../types/types';

type DbQueryResult<T> = [T[], any];

export const downloadTablature = async (req: Request, res: ExpressResponse): Promise<void> => {
    const { id } = req.params;
    try {
        const [rows]: DbQueryResult<any> = await db.query('SELECT title, tablature FROM songs WHERE idSong = ?', [id]);
        if (!rows.length) {
            res.status(404).json({ error: 'Song not found' });
            return;
        }
        const song = rows[0];
        const tablature = JSON.parse(song.tablature);
        const filename = `${song.title || 'tablature'}.json`;
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(tablature, null, 2));
    } catch (err) {
        console.error('Error downloading tablature:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getSongById = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows]: DbQueryResult<any> = await db.query('SELECT * FROM songs WHERE idSong = ?', [req.params.id]);

        if (!rows.length) {
            res.status(404).json({ error: 'Song not found' });
            return;
        }

        const song = rows[0];
        const [ratings]: DbQueryResult<any> = await db.query('SELECT idUser, rating FROM ratings WHERE idSong = ?', [
            song.idSong,
        ]);
        const formattedRatings = ratings.map((r: any) => ({ userId: r.idUser, value: r.rating }));

        const [comments]: DbQueryResult<any> = await db.query(
            `
            SELECT c.idComment, c.content, u.idUser, u.username
            FROM comments c
            JOIN users u ON c.idUser = u.idUser
            WHERE c.idSong = ?
        `,
            [song.idSong],
        );
        const formattedComments = comments.map((c: any) => ({
            idComment: c.idComment,
            content: c.content,
            author: {
                idUser: c.idUser,
                username: c.username,
            },
        }));

        const [userRows]: DbQueryResult<any> = await db.query('SELECT username FROM users WHERE idUser = ?', [
            song.idUser,
        ]);
        const username = userRows.length > 0 ? userRows[0].username : '';

        const formattedSong: Song = {
            idSong: song.idSong,
            songTitle: song.title,
            author: username,
            idUser: song.idUser,
            rating: formattedRatings,
            place: 0,
            tablature: JSON.parse(song.tablature) as Tablature,
            bpm: song.default_bpm,
            deleted_by_idUser: song.deleted_by_idUser || null,
            comments: formattedComments,
        };

        res.json(formattedSong);
    } catch (err) {
        console.error('Error fetching song:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllSongs = async (req: Request, res: Response): Promise<void> => {
    try {
        const [songs]: DbQueryResult<any> = await db.query('SELECT * FROM songs WHERE deleted_by_idUser IS NULL;');

        const [allRatings]: DbQueryResult<any> = await db.query('SELECT idSong, idUser, rating FROM ratings');

        const [allComments]: DbQueryResult<any> = await db.query(`
            SELECT c.idComment, c.content, c.idSong, u.idUser, u.username
            FROM comments c
            JOIN users u ON c.idUser = u.idUser
        `);

        const [allUsers]: DbQueryResult<any> = await db.query('SELECT idUser, username FROM users');

        const formattedSongs: Song[] = songs.map((song) => {
            const ratings = allRatings
                .filter((r: any) => r.idSong === song.idSong)
                .map((r: any) => ({ userId: r.idUser, value: r.rating }));
            const comments = allComments
                .filter((c: any) => c.idSong === song.idSong)
                .map((c: any) => ({
                    idComment: c.idComment,
                    content: c.content,
                    author: {
                        idUser: c.idUser,
                        username: c.username,
                    },
                }));
            const user = allUsers.find((u: any) => u.idUser === song.idUser);
            return {
                idSong: song.idSong,
                songTitle: song.title,
                author: user ? user.username : '',
                idUser: song.idUser,
                rating: ratings,
                place: 0,
                tablature: JSON.parse(song.tablature) as Tablature,
                bpm: song.default_bpm,
                deleted_by_idUser: song.deleted_by_idUser || null,
                comments: comments,
            };
        });

        res.json(formattedSongs);
    } catch (err) {
        console.error('Error fetching songs:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createSong = async (req: Request, res: Response): Promise<void> => {
    const { idUser, title, default_bpm, tablature } = req.body;

    if (!idUser || !title || !default_bpm || !tablature) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

    try {
        const idSong = uuidv4();
        await db.query(
            'INSERT INTO songs (idSong, idUser, title, default_bpm, tablature, average_rating) VALUES (?, ?, ?, ?, ?, ?)',
            [idSong, idUser, title, default_bpm, JSON.stringify(tablature), 0.0],
        );
        res.status(201).json({ idSong });
    } catch (err) {
        console.error('Error creating song:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateSong = async (req: Request, res: Response): Promise<void> => {
    const { title, default_bpm, tablature, deleted_by_idUser } = req.body;
    const { id } = req.params;

    if (!title || !default_bpm || !tablature) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }
    try {
        // 1. Pobierz aktualny rekord utworu
        const [currentRows]: any = await db.query('SELECT * FROM songs WHERE idSong = ?', [id]);
        if (!currentRows.length) {
            res.status(404).json({ error: 'Song not found' });
            return;
        }
        const currentSong = currentRows[0];

        // 2. Pobierz aktualny numer wersji historii
        const [historyRows]: any = await db.query(
            'SELECT MAX(version_number) as maxVersion FROM songs_history WHERE idSong = ?',
            [id],
        );
        const newVersion = (historyRows[0]?.maxVersion || 0) + 1;

        // 3. Zapisz starą wersję do historii
        const idHistory = uuidv4();
        await db.query(
            'INSERT INTO songs_history (idHistory, idSong, version_number, tablature, edited_by, edited_at) VALUES (?, ?, ?, ?, ?, NOW())',
            [idHistory, id, newVersion, currentSong.tablature, req.user?.idUser || null],
        );

        // 4. Zaktualizuj rekord w songs
        let query = 'UPDATE songs SET title = ?, default_bpm = ?, tablature = ?, updated_at = CURRENT_TIMESTAMP';
        const params: any[] = [title, default_bpm, JSON.stringify(tablature)];
        if (typeof deleted_by_idUser !== 'undefined') {
            query += ', deleted_by_idUser = ?';
            params.push(deleted_by_idUser === null || deleted_by_idUser === undefined ? null : deleted_by_idUser);
        }
        query += ' WHERE idSong = ?';
        params.push(id);

        const [result]: any = await db.query(query, params);

        res.json({ message: 'Song updated successfully' });
    } catch (err) {
        console.error('Error updating song:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteSong = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!req.user?.idUser) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    try {
        const [result]: any = await db.query('UPDATE songs SET deleted_by_idUser = ? WHERE idSong = ?', [
            req.user.idUser,
            id,
        ]);

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Song not found' });
            return;
        }

        res.json({ message: 'Song marked as deleted successfully' });
    } catch (err) {
        console.error('Error deleting song:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const addCommentToSong = async (req: Request, res: Response): Promise<void> => {
    const { songId } = req.params;
    const { idUser, content } = req.body;

    if (!idUser || !content) {
        res.status(400).json({ error: 'Brak wymaganych pól' });
        return;
    }

    try {
        const idComment = uuidv4();
        const sql = `
            INSERT INTO comments (idComment, idSong, idUser, content)
            VALUES (?, ?, ?, ?)
        `;
        await db.query(sql, [idComment, songId, idUser, content]);

        const [comments]: DbQueryResult<any> = await db.query(
            `
            SELECT c.*, u.username 
            FROM comments c
            JOIN users u ON c.idUser = u.idUser
            WHERE c.idComment = ?
        `,
            [idComment],
        );

        if (!comments.length) {
            throw new Error('Failed to retrieve created comment');
        }

        const newComment: Comment = {
            idComment: comments[0].idComment,
            content: comments[0].content,
            author: {
                idUser: comments[0].idUser,
                username: comments[0].username,
            },
        };

        res.status(201).json(newComment);
    } catch (err) {
        console.error('Błąd dodawania komentarza:', err);
        res.status(500).json({ error: 'Błąd serwera' });
    }
};

export const deleteCommentFromSong = async (req: Request, res: Response): Promise<void> => {
    const { songId, commentId } = req.params;

    try {
        const sql = 'DELETE FROM comments WHERE idComment = ? AND idSong = ?';
        const [result]: any = await db.query(sql, [commentId, songId]);

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Komentarz nie znaleziony' });
            return;
        }

        res.json({ message: 'Komentarz usunięty' });
    } catch (err) {
        console.error('Błąd usuwania komentarza:', err);
        res.status(500).json({ error: 'Błąd serwera' });
    }
};

export const getTopRatedSongs = async (req: Request, res: Response): Promise<void> => {
    try {
        const [songs]: DbQueryResult<any> = await db.query(`
            SELECT s.*, 
                COUNT(r.idRating) AS rating_count, 
                AVG(r.rating) AS average_rating
            FROM songs s
            LEFT JOIN ratings r ON s.idSong = r.idSong
            GROUP BY s.idSong
        `);

        if (songs.length === 0) {
            res.json([]);
            return;
        }

        const totalRatings = songs.reduce((sum: number, s: any) => sum + (s.rating_count || 0), 0);
        const totalAverage = songs.reduce(
            (sum: number, s: any) => sum + (s.average_rating || 0) * (s.rating_count || 0),
            0,
        );
        const globalAverage = totalRatings > 0 ? totalAverage / totalRatings : 0;
        const m = totalRatings / songs.length;

        // Pobierz wszystkie oceny i użytkowników
        const [allRatings]: DbQueryResult<any> = await db.query('SELECT idSong, idUser, rating FROM ratings');
        const [allUsers]: DbQueryResult<any> = await db.query('SELECT idUser, username FROM users');

        const weightedSongs = songs.map((song) => {
            const v = song.rating_count || 0;
            const r = song.average_rating || 0;
            const weightedScore = (v / (v + m)) * r + (m / (v + m)) * globalAverage;
            const ratings = allRatings
                .filter((rat: any) => rat.idSong === song.idSong)
                .map((rat: any) => ({ userId: rat.idUser, value: rat.rating }));
            const user = allUsers.find((u: any) => u.idUser === song.idUser);
            return {
                ...song,
                averageRating: weightedScore,
                id: song.idSong,
                songTitle: song.title,
                author: user ? user.username : '',
                rating: ratings,
                bpm: song.default_bpm,
                tablature: JSON.parse(song.tablature) as Tablature,
            };
        });

        // Odfiltruj utwory bez ocen
        const ratedSongs = weightedSongs.filter((song) => Array.isArray(song.rating) && song.rating.length > 0);
        ratedSongs.sort((a, b) => b.averageRating - a.averageRating);
        const updatedSongs = ratedSongs.map((song, idx) => ({
            ...song,
            place: idx < 3 ? idx + 1 : 0,
        }));
        res.json(updatedSongs.filter((s) => s.place > 0));
    } catch (error) {
        console.error('Error in getTopRatedSongs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const saveLastPlayedSong = async (req: Request, res: Response) => {
    try {
        const { idUser, idSong } = req.body;

        if (!idUser || !idSong) {
            res.status(400).json({ message: 'idUser i idSong są wymagane' });
            return;
        }

        const [existing] = await db.query(
            'SELECT idLastPlayedSong FROM lastplayedsongs WHERE idUser = ? AND idSong = ?',
            [idUser, idSong],
        );

        if ((existing as any[]).length > 0) {
            await db.query(
                'UPDATE lastplayedsongs SET lastPlayed = CURRENT_TIMESTAMP WHERE idUser = ? AND idSong = ?',
                [idUser, idSong],
            );
        } else {
            const idLastPlayedSong = uuidv4();
            await db.query(
                'INSERT INTO lastplayedsongs (idLastPlayedSong, idUser, idSong, lastPlayed) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
                [idLastPlayedSong, idUser, idSong],
            );
        }

        res.status(200).json({ message: 'Last played song saved' });
    } catch (error) {
        console.error('Error in saveLastPlayedSong:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getLastPlayedSongs = async (req: Request, res: Response) => {
    try {
        const { idUser } = req.params;

        if (!idUser) {
            res.status(400).json({ message: 'idUser jest wymagane' });
            return;
        }

        const [rows] = await db.query(
            `SELECT idSong FROM lastplayedsongs
             WHERE idUser = ?
             ORDER BY lastPlayed DESC
             LIMIT 3`,
            [idUser],
        );

        const songIds = (rows as any[]).map((row) => row.idSong);

        if (songIds.length === 0) {
            res.json([]);
            return;
        }

        // Pobierz szczegóły piosenek
        const [songs] = await db.query(`SELECT * FROM songs WHERE idSong IN (?)`, [songIds]);
        // Pobierz wszystkich użytkowników (idUser, username)
        const [allUsers]: DbQueryResult<any> = await db.query('SELECT idUser, username FROM users');
        // Pobierz wszystkie oceny
        const [allRatings]: DbQueryResult<any> = await db.query('SELECT idSong, idUser, rating FROM ratings');

        const songsArray = songs as any[];
        // Posortuj wg kolejności idSong i dołącz author oraz rating
        const sortedSongs = songIds
            .map((id) => {
                const s = songsArray.find((song) => song.idSong === id);
                if (!s) return null;
                const user = allUsers.find((u: any) => u.idUser === s.idUser);
                const ratings = allRatings
                    .filter((r: any) => r.idSong === s.idSong)
                    .map((r: any) => ({ userId: r.idUser, value: r.rating }));
                return {
                    ...s,
                    songTitle: s.songTitle || s.title || '',
                    author: user ? user.username : '',
                    rating: ratings,
                    tablature: JSON.parse(s.tablature),
                };
            })
            .filter(Boolean);

        res.json(sortedSongs);
    } catch (error) {
        console.error('Error in getLastPlayedSongs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const rateSong = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { idUser, rating } = req.body;

    if (!idUser || !rating) {
        res.status(400).json({ error: 'Brak wymaganych pól' });
        return;
    }

    try {
        const [existing]: any = await db.query('SELECT * FROM ratings WHERE idUser = ? AND idSong = ?', [idUser, id]);
        if (existing.length > 0) {
            await db.query('UPDATE ratings SET rating = ? WHERE idUser = ? AND idSong = ?', [rating, idUser, id]);
        } else {
            const idRating = uuidv4();
            await db.query('INSERT INTO ratings (idRating, idUser, idSong, rating) VALUES (?, ?, ?, ?)', [
                idRating,
                idUser,
                id,
                rating,
            ]);
        }
        // Przelicz średnią ocen i zaktualizuj pole average_rating w songs
        const [avgRows]: any = await db.query('SELECT AVG(rating) as avg FROM ratings WHERE idSong = ?', [id]);
        const avg = avgRows[0]?.avg || 0;
        await db.query('UPDATE songs SET average_rating = ? WHERE idSong = ?', [avg, id]);

        res.status(200).json({ message: 'Ocena zapisana' });
    } catch (err) {
        console.error('Błąd przy ocenianiu utworu:', err);
        res.status(500).json({ error: 'Błąd serwera' });
    }
};

export const getSongHistoryVersion = async (req: Request, res: Response): Promise<void> => {
    const { id, version } = req.params;
    try {
        const [rows]: any = await db.query('SELECT * FROM songs_history WHERE idSong = ? AND version_number = ?', [
            id,
            version,
        ]);
        if (!rows.length) {
            res.status(404).json({ error: 'History version not found' });
            return;
        }
        const historyVersion = rows[0];
        res.json({
            idHistory: historyVersion.idHistory,
            idSong: historyVersion.idSong,
            version_number: historyVersion.version_number,
            tablature: JSON.parse(historyVersion.tablature),
            edited_by: historyVersion.edited_by,
            edited_at: historyVersion.edited_at,
        });
    } catch (err) {
        console.error('Error fetching song history version:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getSongHistoryVersions = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const [rows]: any = await db.query(
            'SELECT version_number, edited_at FROM songs_history WHERE idSong = ? ORDER BY version_number ASC',
            [id],
        );
        if (!rows.length) {
            res.json([]);
            return;
        }
        const versions = rows.map((row: any) => ({
            version_number: row.version_number,
            edited_at: row.edited_at,
        }));
        res.json(versions);
    } catch (err) {
        console.error('Error fetching song history versions:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllReportedSongs = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows]: DbQueryResult<any> = await db.query('SELECT * FROM reported_songs');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching all reported songs:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
