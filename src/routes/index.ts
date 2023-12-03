import { Router } from 'express';
import auth from './auth';
import cart from './cart';
import products from './products';
import users from './users';

const router = Router();

router.get('/', (_, response) => response.status(200).json({ datetime: new Date().toLocaleString('pt-BR') }));

router.use('/auth', auth);

router.use('/cart', cart);

router.use('/users', users);

router.use('/products', products);

export { router };