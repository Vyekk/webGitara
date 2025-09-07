import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authLimiter, registerLimiter, passwordResetLimiter } from '../middleware/rateLimiter';
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

router.post('/', registerLimiter, registerUser);
router.post('/sessions', authLimiter, loginUser);
router.delete('/sessions/current', authenticateToken, logoutUser);

router.post('/password-reset-requests', passwordResetLimiter, requestPasswordReset);
router.patch('/password', authenticateToken, updatePassword);
router.post('/password-reset', passwordResetLimiter, resetPassword);
router.get('/password-reset', passwordResetLimiter, resetPassword);
router.patch('/stats', authenticateToken, updateAllUsersStats);

router.get('/me', authenticateToken, getCurrentUser);

router.get('/', authenticateToken, getAllUsers);

router.post('/activation', activateUser);
router.get('/activation', activateUser);

router.get('/:id', authenticateToken, getUserById);
router.delete('/:id', authenticateToken, deleteUser);
router.patch('/:id/role', authenticateToken, updateUserRole);
router.patch('/:id/stats', authenticateToken, updateUserStats);

router.get('/:id/favourites', authenticateToken, getUserFavourites);
router.put('/:id/favourites', authenticateToken, updateUserFavourites);

router.get('/:id/reported-songs', authenticateToken, getUserReportedSongs);
router.put('/:id/reported-songs', authenticateToken, updateUserReportedSongs);

export default router;
