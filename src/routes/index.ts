import { Router } from 'express';
import auth from './auth';
import products from './products';
import users from './users';

const router = Router();

router.get('/', (_, response) => response.status(200).json({ datetime: new Date().toLocaleString('pt-BR') }));

router.use('/auth', auth);

router.use('/users', users);

router.use('/products', products);

export { router };