import createHttpError from 'http-errors';
import Products from '../models/products';

interface ICreateDataProduct {
  name: string;
  price: number;
  supplier: string;
  image_url: string;
  description: string;
  product_location: string;
}

interface IUpdateDataProduct {
  name?: string;
  price?: number;
  supplier?: string;
  image_url?: string;
  description?: string;
  product_location?: string;
}

class ProductsService {
  create = async (data: ICreateDataProduct) => {
    const product = Products.create(data);

    return product;
  };

  getAll = async () => {
    const products = await Products.find().sort({ createdAt: -1 });

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
    product.price = data.price ?? product.price;
    product.supplier = data.supplier ?? product.supplier;
    product.image_url = data.image_url ?? product.image_url;
    product.description = data.description ?? product.description;
    product.product_location = data.product_location ?? product.product_location;

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