import express from 'express';
import CartController from '../app/controllers/cart.controller';
import auth from '../app/middleware/auth.middleware';

const router = express.Router();

router.post('/', auth, CartController.create);

router.get('/', auth, CartController.getAll);

router.get('/:id', auth, CartController.getById);

// router.put('/:id', auth, CartController.update);

// router.delete('/:id', auth, CartController.delete);

export default router;
