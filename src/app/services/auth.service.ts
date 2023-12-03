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
        
        const user = await Users.findOne({ email });

        if (!user) throw createHttpError.NotFound('EMAIL_ADDRESS_OR_PASSWORD_INCORRENT');

        if (!user.password) throw createHttpError.NotFound('REGISTRATION_NOT_FINALIZED');

        const checkPassword = bcrypt.compareSync(password, user.password);

        if (!checkPassword) throw createHttpError.Unauthorized('EMAIL_ADDRESS_OR_PASSWORD_INCORRENT');

        const token = {
            token: sign({ name: user.name, email: user.email },
                ACCESS_TOKEN_SECRET,
                {
                    subject: user._id.toString(),
                    expiresIn: '12h',
                }
            )
        };

        return token;
    }
}

export default new AuthService();
