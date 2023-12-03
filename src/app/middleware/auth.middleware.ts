import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';

const auth = async (request: Request, response: Response, next: NextFunction) => {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
    const token = request.headers.authorization;

    if (!token) return response.status(401).json({ message: 'Unauthorized' });

    const [, authToken] = token.split(' ');

    try {
        jwt.verify(authToken, ACCESS_TOKEN_SECRET);

        return next();
    } catch (error) {
        return response.status(401).json({ message: 'Token invalid' });
    }
};

export default auth;
