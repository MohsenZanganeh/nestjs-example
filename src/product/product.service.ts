import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Product } from './product.interface';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>,
  ) {}

  async create(data): Promise<Product> {
    const createdCat = new this.productModel(data);
    return createdCat.save();
  }

  async getProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
  async updateProduct(id, data): Promise<number> {
    const user = await this.productModel.updateOne({ _id: id }, data);

    return user.n;
  }
  async deleteProduct(id): Promise<number> {
    const user = await this.productModel.remove({ _id: id });
    return user.n;
  }
}
