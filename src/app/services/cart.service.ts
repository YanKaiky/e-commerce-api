import createHttpError from 'http-errors';
import Cart from '../models/cart';
import * as bcrypt from 'bcryptjs';
import 'dotenv/config';
import { ObjectId } from 'mongoose';

interface ICreateDataUser {
  user_id: string;
  product_id: string;
  quantity: number;
}

interface IUpdateDataUser {
  user_id?: string;
  product_id?: string;
}

class CartService {
  create = async (data: ICreateDataUser) => {
    const userCart = await Cart.findOne({ user_id: data.user_id });

    const product_id: ObjectId | any = data.product_id;
    const quantity: number = data.quantity;

    if (userCart) {
      const cart = userCart.products.find((pdct) => pdct.product_id?.toString() === product_id);

      if (cart) {
        cart.quantity += 1;
      } else {
        userCart.products.push({ product_id, quantity });
      }

      await userCart.save();

      return userCart;
    } else {
      const userCart = await Cart.create({
        user_id: data.user_id,
        products: [{ product_id, quantity }],
      });

      await userCart.save();

      return userCart;
    }
  };

  getAll = async (user_id?: string) => {
    let cart = [];

    if (user_id) {
      cart = await Cart.find({ user_id }).populate('products.product_id', '_id title supplier image__url').sort({ new: -1, timestamp: -1 });
    } else {
      cart = await Cart.find().sort({ new: -1, timestamp: -1 });
    }

    return cart;
  };

  getById = async (_id: string) => {
    const cart = await Cart.findById(_id).populate('products.product_id', '_id title supplier image__url');

    if (!cart) throw createHttpError.NotFound('CART_NOT_FOUND');

    return cart;
  };

  update = async (user_id: string, data: IUpdateDataUser) => {
    const cart = await Cart.findOne({ user_id });

    if (!cart) throw createHttpError.NotFound('USER_NOT_FOUND');

    cart.name = data.name ?? cart.name;
    cart.cartname = data.cartname ?? cart.cartname;
    cart.email = data.email ?? cart.email;
    cart.password = data.password ? bcrypt.hashSync(data.password, 12) : cart.password;
    cart.location = data.location ?? cart.location;

    cart.save();

    return cart;
  };

  delete = async (_id: string, type?: string) => {
    const cart = await Cart.findById(_id);

    if (!cart) throw createHttpError.NotFound('CART_NOT_FOUND');

    await Cart.deleteOne({ _id });

    return true;
  };
}

export default new CartService();