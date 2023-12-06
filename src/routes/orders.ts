import express from 'express';
import OrdersController from '../app/controllers/orders.controller';
import auth from '../app/middleware/auth.middleware';

const router = express.Router();

router.get('/', auth, OrdersController.getAll);

export default router;
