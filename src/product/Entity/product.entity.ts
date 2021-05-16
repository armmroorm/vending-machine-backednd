import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, JoinTable, ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { IsNotEmpty, Length } from 'class-validator';
import { MachineEntity } from '../../machine/Entity/machine.entity';
import { OrdersEntity } from "../../orders/Entity/orders.entity";

@Entity('product_tb')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'machine_id', type: 'int', nullable: false })
  @IsNotEmpty()
  machine_id: number;

  @Column({ name: 'product_name', type: 'text', nullable: false })
  @Length(0)
  @IsNotEmpty()
  product_name: string;

  @Column({ name: 'price', type: 'decimal', nullable: false })
  @IsNotEmpty()
  price: number;

  @Column({ name: 'number', type: 'int', nullable: false })
  @IsNotEmpty()
  number: number;

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

  @ManyToOne(() => MachineEntity, (machineEntity) => machineEntity.product, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'machine_id' })
  machine: MachineEntity;

  @ManyToMany(() => OrdersEntity, (ordersEntity) => ordersEntity.product)
  orders: OrdersEntity[];
}
