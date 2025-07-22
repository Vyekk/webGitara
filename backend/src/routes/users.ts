import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import {
    registerUser,
    loginUser,
    updatePassword,
    getAllUsers,
    getUserById,
    updateUserStats,
    updateAllUsersStats,
    updateUserFavourites,
    deleteUser,
    updateUserRole,
    getUserFavourites,
    activateUser,
    requestPasswordReset,
    resetPassword,
    updateUserReportedSongs,
    getUserReportedSongs,
    logoutUser,
    getCurrentUser,
} from '../controllers/usersController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);
router.put('/password', authenticateToken, updatePassword);
router.get('/me', authenticateToken, getCurrentUser);
router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);
router.put('/:id/stats', authenticateToken, updateUserStats);
router.put('/stats/all', authenticateToken, updateAllUsersStats);
router.put('/:userId/favourites', authenticateToken, updateUserFavourites);
router.get('/:userId/favourites', authenticateToken, getUserFavourites);
router.put('/:userId/reported_songs', authenticateToken, updateUserReportedSongs);
router.get('/:userId/reported_songs', authenticateToken, getUserReportedSongs);
router.put('/:id/role', authenticateToken, updateUserRole);
router.delete('/:id', authenticateToken, deleteUser);
router.post('/activate', activateUser);
router.post('/logout', logoutUser);

export default router;
