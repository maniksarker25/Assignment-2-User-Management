import express from 'express';
import { UserControllers } from './user.controllers';

const router = express.Router();

router.post('/users', UserControllers.createUser);
router.get('/users', UserControllers.getAllUser);
router.get('/users/:userId', UserControllers.getSingleUser);

export const userRoutes = router;
