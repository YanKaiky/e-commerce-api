import createHttpError from 'http-errors';
import Cart from '../models/cart';
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
  addCartProduct = async (data: ICreateDataUser) => {
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
    const cart = await Cart.find({ user_id }).populate('products.product_id', '_id title supplier image__url').sort({ new: -1, timestamp: -1 });

    return cart;
  };

  decrementCartProduct = async (data: IUpdateDataUser) => {
    const cart = await Cart.findOne({ user_id: data.user_id });

    if (!cart) throw createHttpError.NotFound('CART_NOT_FOUND');

    const existingProduct = cart.products.find((pdct) => pdct.product_id?.toString() === data.product_id);

    if (!existingProduct) throw createHttpError.NotFound('PRODUCT_NOT_FOUND');

    if (existingProduct.quantity === 1) {
      cart.products = cart.products.filter((pdct) => pdct.product_id?.toString() !== data.product_id);
    } else if (existingProduct.quantity === 0) {
      await Cart.updateOne({ user_id: data.user_id }, { $pull: { products: data.product_id } })
    } else {
      existingProduct.quantity -= 1;
    }

    await cart.save();

    return cart;
  };

  delete = async (product_id: string) => {
    const cart = await Cart.findOneAndUpdate(
      { 'products._id': product_id },
      { $pull: { products: { _id: product_id } } },
      { new: true },
    );

    if (!cart) throw createHttpError.NotFound('PRODUCT_NOT_FOUND');

    return true;
  };
}

export default new CartService();