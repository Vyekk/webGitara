import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { commentLimiter } from '../middleware/rateLimiter';
import {
    getAllSongs,
    getSongById,
    createSong,
    updateSong,
    deleteSong,
    addCommentToSong,
    deleteCommentFromSong,
    rateSong,
    saveLastPlayedSong,
    getTopRatedSongs,
    getLastPlayedSongs,
    getSongHistoryVersions,
    getSongHistoryVersion,
    downloadTablature,
    getAllReportedSongs,
} from '../controllers/songsController';

const router = express.Router();

router.get('/', getAllSongs);
router.post('/', authenticateToken, createSong);

router.get('/top-rated', getTopRatedSongs);

router.get('/reported', authenticateToken, getAllReportedSongs);

router.post('/last-played', authenticateToken, saveLastPlayedSong);
router.get('/last-played/:idUser', authenticateToken, getLastPlayedSongs);

router.get('/:id', getSongById);
router.put('/:id', authenticateToken, updateSong);
router.delete('/:id', authenticateToken, deleteSong);

router.get('/:id/history', getSongHistoryVersions);
router.get('/:id/history/:version', getSongHistoryVersion);

router.get('/:id/tablature', downloadTablature);

router.post('/:songId/comments', authenticateToken, commentLimiter, addCommentToSong);
router.delete('/:songId/comments/:commentId', authenticateToken, deleteCommentFromSong);

router.post('/:id/ratings', authenticateToken, rateSong);

export default router;
