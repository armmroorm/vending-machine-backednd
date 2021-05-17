import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './Entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { loggerDeleteId } from '../utils/loggerDeleteId';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private mailService: MailService,
  ) {}

  GetAll = async (): Promise<any> => {
    const quiryBuilder =
      this.productRepository.createQueryBuilder('product_tb');
    const products = quiryBuilder.orderBy('product_tb.id', 'DESC').getMany();

    return products;
  };

  create = async (createProductDto: CreateProductDto) => {
    const { productName, price, machineId, number } = createProductDto;
    const product = new ProductEntity();
    product.product_name = productName;
    product.machine_id = machineId;
    product.price = price;
    product.number = number;
    await product.save();

    return product;
  };

  update = async (id: number, updateProductDto: UpdateProductDto) => {
    const { productName, price, machineId, number } = updateProductDto;
    const product = await this.QueryById(id);

    if (!product) {
      throw new NotFoundException(`Product with id : ${id} not found`);
    }

    if (
      productName !== null &&
      price !== null &&
      machineId !== null &&
      number !== null
    ) {
      product.product_name = productName;
      product.machine_id = machineId;
      product.price = price;
      product.number = number;
    }

    await product.save();

    return product;
  };

  delete = async (id: number) => {
    const deleteProduct = await this.productRepository.delete(id);

    if (deleteProduct.affected === 0) {
      throw new NotFoundException(`Product with id : ${id} not found`);
    }

    return loggerDeleteId(id);
  };

  checkStock = async (): Promise<any> => {
    const data = await this.QueryProductSoldOut();
    if (data.length === 0) {
      return;
    }

    await this.mailService.sendNotificationToAddmin();

    return data;
  };

  QueryProductSoldOut = async () => {
    const quiryBuilder =
      this.productRepository.createQueryBuilder('product_tb');
    const products = quiryBuilder
      .orderBy('product_tb.id', 'DESC')
      .leftJoinAndSelect('product_tb.machine', 'machineEntity')
      .where('product_tb.number < 11')
      .getMany();

    return products;
  };

  QueryById = async (id) => {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product with id : ${id} not found`);
    }

    return product;
  };
}
