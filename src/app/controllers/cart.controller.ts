import { Request, Response } from 'express';
import CartService from '../services/cart.service';

class CartController {
  async addCartProduct(request: Request, response: Response) {
    try {
      const payload = {
        user_id: request.body.user_id,
        product_id: request.body.product_id,
        quantity: request.body.quantity,
      };

      const cart = await CartService.addCartProduct(payload);

      response.status(201).json(cart);
    } catch (error: any) {
      response.json({ message: error.message });
    }
  }

  async getAll(request: Request, response: Response) {
    try {
      const user_id = request.query.user_id as string;

      const cart = await CartService.getAll(user_id);

      response.status(200).json(cart);
    } catch (error: any) {
      response.json({ message: error.message });
    }
  }

  async getById(request: Request, response: Response) {
    try {
      const id = request.params.id;

      const cart = await CartService.getById(id);

      response.status(200).json(cart);
    } catch (error: any) {
      response.json({ message: error.message });
    }
  }

  async decrementCartProduct(request: Request, response: Response) {
    try {
      const payload = {
        user_id: request.body.user_id,
        product_id: request.params.product_id,
      };

      const cart = await CartService.decrementCartProduct(payload);

      response.status(200).json(cart);
    } catch (error: any) {
      response.json({ message: error.message });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const product_id = request.params.product_id;

      const cart = await CartService.delete(product_id);

      response.status(200).json(cart);
    } catch (error: any) {
      response.json({ message: error.message });
    }
  }
}

export default new CartController();