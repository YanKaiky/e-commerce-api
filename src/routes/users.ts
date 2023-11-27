import express from 'express';
import UsersController from '../app/controllers/users.controller';

const router = express.Router();

router.post('/', UsersController.create);

router.get('/', UsersController.getAll);

router.get('/:id', UsersController.getById);

router.put('/:id', UsersController.update);

router.delete('/:id', UsersController.delete);

export default router;
