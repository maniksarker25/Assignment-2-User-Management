import express from 'express';
import { UserControllers } from './user.controllers';

const router = express.Router();

router.post('/users', UserControllers.createUser);
router.get('/users', UserControllers.getAllUser);

export const userRoutes = router;
