import express from 'express';
import { UserControllers } from './user.controllers';

const router = express.Router();

router.post('/users', UserControllers.createUser);
router.get('/users', UserControllers.getAllUser);
router.get('/users/:userId', UserControllers.getSingleUser);
router.delete('/users/:userId', UserControllers.deleteUser);
router.put('/users/:userId', UserControllers.updateUser);
router.put('/users/:userId/orders', UserControllers.addProductInOrders);
router.get('/users/:userId/orders', UserControllers.getOrderForSpecificUser);

export const userRoutes = router;
