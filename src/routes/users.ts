import express from 'express';
import UsersController from '../app/controllers/users.controller';
import auth from '../app/middleware/auth.middleware';

const router = express.Router();

router.post('/', UsersController.create);

router.get('/', auth, UsersController.getAll);

router.get('/:id', auth, UsersController.getById);

router.put('/:id', auth, UsersController.update);

router.delete('/:id', auth, UsersController.delete);

export default router;
