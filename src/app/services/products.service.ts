import createHttpError from 'http-errors';
import Products from '../models/products';

interface ICreateDataProduct {
  name: string;
}

interface IUpdateDataProduct {
  name: string;
}

class ProductsService {
  create = async (data: ICreateDataProduct) => {
    const product = Products.create({ name: data.name });

    return product;
  };

  getAll = async () => {
    const products = await Products.find().sort({ new: -1, timestamp: -1 });

    return products;
  };

  getById = async (_id: string) => {
    const product = await Products.findById(_id);

    if (!product) throw createHttpError.NotFound('USER_NOT_FOUND');

    return product;
  };

  update = async (_id: string, data: IUpdateDataProduct) => {
    const product = await Products.findById(_id);

    if (!product) throw createHttpError.NotFound('USER_NOT_FOUND');

    product.name = data.name ?? product.name;

    product.save();

    return product;
  };

  delete = async (_id: string) => {
    const product = await Products.findById(_id);

    if (!product) throw createHttpError.NotFound('USER_NOT_FOUND');

    await Products.deleteOne({ _id });

    return true;
  };
}

export default new ProductsService();