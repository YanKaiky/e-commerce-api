import express from 'express';
import CartController from '../app/controllers/cart.controller';
import auth from '../app/middleware/auth.middleware';

const router = express.Router();

router.post('/', auth, CartController.addCartProduct);

router.get('/', auth, CartController.getAll);

router.get('/:id', auth, CartController.getById);

router.put('/:product_id', auth, CartController.decrementCartProduct);

router.delete('/:product_id', auth, CartController.delete);

export default router;
