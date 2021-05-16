import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersEntity } from './Entity/orders.entity';
import { Repository } from 'typeorm';
import { CreateOrdersDto } from './dto/create-orders-dto';
import { UpdateOrdersDto } from './dto/update-orders-dto';
import { loggerDeleteId } from '../utils/loggerDeleteId';
import { ProductService } from '../product/product.service';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../mail/mail.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersEntity)
    private ordersRepository: Repository<OrdersEntity>,
    private productService: ProductService,
    private mailService: MailService,
  ) {}

  GetAll = async (): Promise<any> => {
    const quiryBuilder = this.ordersRepository.createQueryBuilder('orders_tb');
    const machine = quiryBuilder.orderBy('orders_tb.id', 'DESC').getMany();

    return machine;
  };

  placeOrder = async (createOrdersDto: CreateOrdersDto) => {
    const { productId, totalPrice, totalNumber } = createOrdersDto;
    const product = await this.productService.QueryById(productId);
    if (product.number <= 0) {
      throw new NotFoundException(`Orders with id : ${productId} is sold out`);
    }
    await this.mailService.sendNotificationToAddmin();

    const uuid = await this.GenerateUUID();
    const order = new OrdersEntity();
    order.product_id = productId;
    order.machine_id = product.machine_id;
    order.product_name = product.product_name;
    order.order_sn = `SN${uuid}`;
    order.total_price = totalPrice;
    order.total_number = totalNumber;

    const total = product.number - totalNumber;
    product.number = total;

    await product.save();
    await order.save();

    return order;
  };

  update = async (id: number, updateOrdersDto: UpdateOrdersDto) => {
    const {
      productName,
      productId,
      machineId,
      orderSn,
      totalPrice,
      totalNumber,
    } = updateOrdersDto;
    const order = await this.QueryById(id);

    if (
      productName !== null &&
      productId !== null &&
      machineId !== null &&
      orderSn !== null &&
      totalPrice !== null &&
      totalNumber !== null
    ) {
      order.product_name = productName;
      order.product_id = productId;
      order.machine_id = machineId;
      order.order_sn = orderSn;
      order.total_price = totalPrice;
      order.total_number = totalNumber;
    }

    await order.save();

    return order;
  };

  delete = async (id: number) => {
    const deleteOrders = await this.ordersRepository.delete(id);

    if (deleteOrders.affected === 0) {
      throw new NotFoundException(`Orders with id : ${id} not found`);
    }

    return loggerDeleteId(id);
  };

  QueryById = async (id) => {
    const orders = await this.ordersRepository.findOne(id);

    if (!orders) {
      throw new NotFoundException(`Orders with id : ${id} not found`);
    }

    return orders;
  };

  GenerateUUID = async () => {
    const myuuid = uuidv4();
    const UUID = myuuid.replace(/-/g, '').substring(0, 20);
    return UUID;
  };
}
