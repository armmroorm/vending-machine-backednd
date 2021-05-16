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
import { OrdersService } from './orders.service';
import { Response } from 'express';
import { NumberTransformPipe } from '../utils/number-transform-pipe';
import { CreateOrdersDto } from './dto/create-orders-dto';
import { IdValidatePipe } from '../utils/id-validate-pipe';
import { UpdateOrdersDto } from './dto/update-orders-dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  async getGallery(@Res() res: Response) {
    const data = await this.ordersService.GetAll();
    res.status(HttpStatus.OK).send(data);
  }

  @Post('placeOrder')
  @UsePipes(NumberTransformPipe, ValidationPipe)
  async createProduct(
    @Body() createOrdersDto: CreateOrdersDto,
    @Res() res: Response,
  ) {
    const data = await this.ordersService.placeOrder(createOrdersDto);
    res.status(HttpStatus.OK).send(data);
  }

  @Put(':id')
  @UsePipes(NumberTransformPipe, ValidationPipe)
  async updateContent(
    @Res() res: Response,
    @Param('id', IdValidatePipe, ParseIntPipe) id: number,
    @Body() updateOrdersDto: UpdateOrdersDto,
  ) {
    const data = await this.ordersService.update(id, updateOrdersDto);
    res.status(HttpStatus.OK).send(data);
  }

  @Delete(':id')
  async deleteNew(
    @Param('id', IdValidatePipe, ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const data = await this.ordersService.delete(id);
    res.status(HttpStatus.OK).send(data);
  }
}
