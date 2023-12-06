import Orders from '../models/orders';

class OrdersService {
  getAll = async (user_id: string) => {
    const orders = await Orders.find({ user_id }).populate({ path: 'product_id', select: '-description, -product_location' }).exec();

    return orders;
  };
}

export default new OrdersService();