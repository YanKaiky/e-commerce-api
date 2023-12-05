import createHttpError from 'http-errors';
import Users from '../models/users';
import * as bcrypt from 'bcryptjs';
import 'dotenv/config';

interface ICreateDataUser {
  name: string;
  username: string;
  email: string;
  password: string;
  location: string;
}

interface IUpdateDataUser {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  location?: string;
}

class UsersService {
  create = async (data: ICreateDataUser) => {
    data.password = bcrypt.hashSync(data.password, 12);

    const user = await Users.create(data);

    return user;
  };

  getAll = async () => {
    const users = await Users.find().sort({ new: -1, timestamp: -1 }).select('-password');;

    return users;
  };

  getById = async (_id: string) => {
    const user = await Users.findById(_id, { password: 0 });

    if (!user) throw createHttpError.NotFound('USER_NOT_FOUND');

    return user;
  };

  update = async (_id: string, data: IUpdateDataUser) => {
    const user = await Users.findById(_id, { password: 0 });

    if (!user) throw createHttpError.NotFound('USER_NOT_FOUND');

    user.name = data.name ?? user.name;
    user.username = data.username ?? user.username;
    user.email = data.email ?? user.email;
    user.password = data.password ? bcrypt.hashSync(data.password, 12) : user.password;
    user.location = data.location ?? user.location;

    user.save();

    return user;
  };

  delete = async (_id: string) => {
    const user = await Users.findById(_id);

    if (!user) throw createHttpError.NotFound('USER_NOT_FOUND');

    await Users.deleteOne({ _id });

    return true;
  };
}

export default new UsersService();