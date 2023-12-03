import express from 'express';
import ProductsController from '../app/controllers/products.controller';
import auth from '../app/middleware/auth.middleware';

const router = express.Router();

router.post('/', auth, ProductsController.create);

router.get('/', auth, ProductsController.getAll);

router.get('/:id', auth, ProductsController.getById);

router.put('/:id', auth, ProductsController.update);

router.delete('/:id', auth, ProductsController.delete);

export default router;
