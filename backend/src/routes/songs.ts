import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
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
router.get('/top-rated', getTopRatedSongs);
router.post('/lastplayedsongs', authenticateToken, saveLastPlayedSong);
router.get('/lastplayedsongs/:idUser', authenticateToken, getLastPlayedSongs);
router.get('/:id', getSongById);
router.get('/:id/history', getSongHistoryVersions);
router.get('/:id/history/:version', getSongHistoryVersion);
router.get('/:id/tablature/download', downloadTablature);
router.post('/', authenticateToken, createSong);
router.put('/:id', authenticateToken, updateSong);
router.delete('/:id', authenticateToken, deleteSong);
router.post('/:songId/comments', authenticateToken, addCommentToSong);
router.delete('/:songId/comments/:commentId', authenticateToken, deleteCommentFromSong);
router.post('/:id/rating', authenticateToken, rateSong);
router.get('/reported_songs/all', authenticateToken, getAllReportedSongs);

export default router;
