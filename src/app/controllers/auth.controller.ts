import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

class AuthController {
  public login = async (request: Request, response: Response) => {
    const authorization = request.headers.authorization as string;

    const auth = Buffer.from(authorization.split(' ')[1], 'base64').toString().split(':');

    const payload = {
      email: auth[0],
      password: auth[1],
    };

    const data = await AuthService.login(payload);

    response.status(200).json(data);
  };
}

export default new AuthController();
