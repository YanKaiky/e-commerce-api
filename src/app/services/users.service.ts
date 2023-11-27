import createHttpError from 'http-errors';
import Users from '../models/users';

interface ICreateDataUser {
  name: string;
}

interface IUpdateDataUser {
  name: string;
}

class UsersService {
  create = async (data: ICreateDataUser) => {
    const user = Users.create({ name: data.name });

    return user;
  };

  getAll = async () => {
    const users = await Users.find().sort({ new: -1, timestamp: -1 });;

    return users;
  };

  getById = async (_id: string) => {
    const user = await Users.findById(_id);

    if (!user) throw createHttpError.NotFound('USER_NOT_FOUND');

    return user;
  };

  update = async (_id: string, data: IUpdateDataUser) => {
    const user = await Users.findById(_id);

    if (!user) throw createHttpError.NotFound('USER_NOT_FOUND');

    user.name = data.name ?? user.name;

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