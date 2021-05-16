import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, Length } from 'class-validator';
import { ProductEntity } from '../../product/Entity/product.entity';

@Entity('orders_tb')
export class OrdersEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_id', type: 'int', nullable: false })
  @IsNotEmpty()
  product_id: number;

  @Column({ name: 'machine_id', type: 'int', nullable: false })
  @IsNotEmpty()
  machine_id: number;

  @Column({ name: 'product_name', type: 'text', nullable: false })
  @Length(0)
  @IsNotEmpty()
  product_name: string;

  @Column({ name: 'order_sn', type: 'text', nullable: false })
  @Length(0)
  @IsNotEmpty()
  order_sn: string;

  @Column({ name: 'total_price', type: 'decimal', nullable: false })
  @IsNotEmpty()
  total_price: number;

  @Column({ name: 'total_number', type: 'int', nullable: false })
  @IsNotEmpty()
  total_number: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @Column({ name: 'deleted_at', type: 'timestamp', default: null })
  deleted_at: Date;

  @ManyToMany(() => ProductEntity, (productEntity) => productEntity.orders)
  @JoinTable({
    joinColumn: { name: 'order_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  product: ProductEntity[];
}
