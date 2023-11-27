import { Request, Response } from 'express';
import ProductsService from '../services/products.service';

class ProductsController {
  async create(request: Request, response: Response) {
    try {
      const payload = {
        name: request.body.name,
        price: request.body.price,
        supplier: request.body.supplier,
        image_url: request.body.image_url,
        description: request.body.description,
        product_location: request.body.product_location,
      };

      const product = await ProductsService.create(payload);

      response.status(201).json(product);
    } catch (error: any) {
      response.json({ message: error.message });
    }
  }

  async getAll(_: Request, response: Response) {
    try {
      const products = await ProductsService.getAll();

      response.status(200).json(products);
    } catch (error: any) {
      response.json({ message: error.message });
    }
  }

  async getById(request: Request, response: Response) {
    try {
      const id = request.params.id;

      const product = await ProductsService.getById(id);

      response.status(200).json(product);
    } catch (error: any) {
      response.json({ message: error.message });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const id = request.params.id;

      const payload = {
        name: request.body.name,
        supplier: request.body.supplier,
        image_url: request.body.image_url,
        description: request.body.description,
        product_location: request.body.product_location,
      };

      const product = await ProductsService.update(id, payload);

      response.status(200).json(product);
    } catch (error: any) {
      response.json({ message: error.message });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const id = request.params.id;

      const product = await ProductsService.delete(id);

      response.status(200).json(product);
    } catch (error: any) {
      response.json({ message: error.message });
    }
  }
}

export default new ProductsController();