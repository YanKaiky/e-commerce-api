import { Request, Response } from 'express';
import OrdersService from '../services/orders.service';

class OrdersController {
  async getAll(request: Request, response: Response) {
    try {
      const user_id = request.query.user_id as string;

      const orders = await OrdersService.getAll(user_id);

      response.status(201).json(orders);
    } catch (error: any) {
      response.json({ message: error.message });
    }
  }
}

export default new OrdersController();