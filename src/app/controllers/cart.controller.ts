import { Request, Response } from 'express';
import CartService from '../services/cart.service';

class CartController {
  async create(request: Request, response: Response) {
    try {
      const payload = {
        user_id: request.body.user_id,
        product_id: request.body.product_id,
        quantity: request.body.quantity,
      };

      const cart = await CartService.create(payload);

      response.status(201).json(cart);
    } catch (error: any) {
      response.json({ message: error.message });
    }
  }

  async getAll(_: Request, response: Response) {
    try {
      const cart = await CartService.getAll();

      response.status(200).json(cart);
    } catch (error: any) {
      response.json({ message: error.message });
    }
  }

  // async getById(request: Request, response: Response) {
  //   try {
  //     const id = request.params.id;

  //     const cart = await CartService.getById(id);

  //     response.status(200).json(cart);
  //   } catch (error: any) {
  //     response.json({ message: error.message });
  //   }
  // }

  // async update(request: Request, response: Response) {
  //   try {
  //     const id = request.params.id;

  //     const payload = {
  //       name: request.body.name,
  //       cartname: request.body.cartname,
  //       email: request.body.email,
  //       password: request.body.password,
  //       location: request.body.location,
  //     };

  //     const cart = await CartService.update(id, payload);

  //     response.status(200).json(cart);
  //   } catch (error: any) {
  //     response.json({ message: error.message });
  //   }
  // }

  // async delete(request: Request, response: Response) {
  //   try {
  //     const id = request.params.id;

  //     const cart = await CartService.delete(id);

  //     response.status(200).json(cart);
  //   } catch (error: any) {
  //     response.json({ message: error.message });
  //   }
  // }
}

export default new CartController();