import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  Request,
  Response,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.interface';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('Product')
@Controller('Product')
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}

  @Post('/products')
  @ApiOperation({ summary: 'create product' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  createProduct(@Req() request: Request): Promise<Product> {
    return this.ProductService.create(request.body);
  }

  @Get('/products')
  @ApiOperation({ summary: 'get products' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getProducts(@Query() query): Promise<Product[]> {
    return this.ProductService.getProducts();
  }
  @Patch('/products/:id')
  @ApiOperation({ summary: 'update product' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updatesers(@Req() request: Request, @Param() Params): Promise<string> {
    const user = await this.ProductService.updateProduct(
      Params.id,
      request.body,
    );
    if (user > 0) {
      return 'updated successfully';
    }
    return 'updated Field';
  }
  @Delete('/products/:id')
  @ApiOperation({ summary: 'delete product' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async deleteUser(@Param() Params): Promise<string> {
    const user = await this.ProductService.deleteProduct(Params.id);
    if (user) {
      return 'deleted successfully';
    }
    return 'deleted Field';
  }
}
