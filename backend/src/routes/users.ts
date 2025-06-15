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
} from '../controllers/usersController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/password', authenticateToken, updatePassword);
router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);
router.put('/:id/stats', authenticateToken, updateUserStats);
router.put('/stats/all', authenticateToken, updateAllUsersStats);
router.put('/:userId/favourites', authenticateToken, updateUserFavourites);
router.get('/:userId/favourites', authenticateToken, getUserFavourites);
router.put('/:id/role', authenticateToken, updateUserRole);
router.delete('/:id', authenticateToken, deleteUser);

export default router;
