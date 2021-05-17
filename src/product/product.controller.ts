import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Response } from 'express';
import { CreateProductDto } from './dto/create-product.dto';
import { IdValidatePipe } from '../utils/id-validate-pipe';
import { UpdateProductDto } from './dto/update-product.dto';
import { NumberTransformPipe } from '../utils/number-transform-pipe';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getGallery(@Res() res: Response) {
    const data = await this.productService.GetAll();
    res.status(HttpStatus.OK).send(data);
  }

  @Get('checkStock')
  async checkStock(@Res() res: Response) {
    const data = await this.productService.checkStock();
    res.status(HttpStatus.OK).send(data);
  }

  @Post()
  @UsePipes(NumberTransformPipe, ValidationPipe)
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response,
  ) {
    const data = await this.productService.create(createProductDto);
    res.status(HttpStatus.OK).send(data);
  }

  @Put(':id')
  @UsePipes(NumberTransformPipe, ValidationPipe)
  async updateContent(
    @Res() res: Response,
    @Param('id', IdValidatePipe, ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const data = await this.productService.update(id, updateProductDto);
    res.status(HttpStatus.OK).send(data);
  }

  @Delete(':id')
  async deleteNew(
    @Param('id', IdValidatePipe, ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const data = await this.productService.delete(id);
    res.status(HttpStatus.OK).send(data);
  }
}
