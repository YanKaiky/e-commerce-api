import Users from '../models/users';
import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import createHttpError from 'http-errors';
import 'dotenv/config';

interface IAuthData {
    email: string;
    password: string;
}

class AuthService {
    async login({ email, password }: IAuthData) {
        const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;

        const userByEmail = await Users.findOne({ email });

        if (!userByEmail) throw createHttpError.NotFound('EMAIL_ADDRESS_OR_PASSWORD_INCORRENT');

        if (!userByEmail.password) throw createHttpError.NotFound('REGISTRATION_NOT_FINALIZED');

        const checkPassword = bcrypt.compareSync(password, userByEmail.password);

        if (!checkPassword) throw createHttpError.Unauthorized('EMAIL_ADDRESS_OR_PASSWORD_INCORRENT');

        const user = {
            _id: userByEmail._id,
            name: userByEmail.name,
            username: userByEmail.username,
            email: userByEmail.email,
            location: userByEmail.location,
            createdAt: userByEmail.createdAt,
            updatedAt: userByEmail.updatedAt,
        };

        const data = {
            token: sign({
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                location: user.location,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
                ACCESS_TOKEN_SECRET,
                {
                    subject: user._id.toString(),
                    expiresIn: '12h',
                }
            ),
            user,
        };

        return data;
    }
}

export default new AuthService();
