import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { productsProviders } from './product.providers';
import { dataBaseModule } from '../db-mongo/database.module';

@Module({
  imports: [dataBaseModule],
  controllers: [ProductController],
  providers: [ProductService, ...productsProviders],
})
export class ProductModule {}
