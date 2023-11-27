import express from 'express';
import ProductsController from '../app/controllers/products.controller';

const router = express.Router();

router.post('/', ProductsController.create);

router.get('/', ProductsController.getAll);

router.get('/:id', ProductsController.getById);

router.put('/:id', ProductsController.update);

router.delete('/:id', ProductsController.delete);

export default router;
