import { Request, Response } from 'express';
import UsersService from '../services/users.service';

class UsersController {
  async create(request: Request, response: Response) {
    try {
      const payload = {
        name: request.body.name,
        username: request.body.username,
        email: request.body.email,
        password: request.body.password,
        location: request.body.location,
      };

      const user = await UsersService.create(payload);

      response.status(201).json(user);
    } catch (error: any) {
      response.json({ message: error.message });
    }
  }

  async getAll(_: Request, response: Response) {
    try {
      const users = await UsersService.getAll();

      response.status(200).json(users);
    } catch (error: any) {
      response.json({ message: error.message });
    }
  }

  async getById(request: Request, response: Response) {
    try {
      const id = request.params.id;

      const user = await UsersService.getById(id);

      response.status(200).json(user);
    } catch (error: any) {
      response.json({ message: error.message });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const id = request.params.id;

      const payload = {
        name: request.body.name,
        username: request.body.username,
        email: request.body.email,
        password: request.body.password,
        location: request.body.location,
      };

      const user = await UsersService.update(id, payload);

      response.status(200).json(user);
    } catch (error: any) {
      response.json({ message: error.message });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const id = request.params.id;

      const user = await UsersService.delete(id);

      response.status(200).json(user);
    } catch (error: any) {
      response.json({ message: error.message });
    }
  }
}

export default new UsersController();