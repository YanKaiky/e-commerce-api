import express from 'express';
import CartController from '../app/controllers/cart.controller';
import auth from '../app/middleware/auth.middleware';

const router = express.Router();

router.post('/', auth, CartController.cartProduct);

router.get('/', auth, CartController.getAll);

router.delete('/', auth, CartController.delete);

export default router;
