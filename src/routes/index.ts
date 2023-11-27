import { Router } from 'express';
import users from './users';

const router = Router();

router.get('/', (_, response) => response.status(200).json({ datetime: new Date().toLocaleString('pt-BR') }));

router.use('/users', users);

export { router };