import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, Length } from 'class-validator';
import { ProductEntity } from '../../product/Entity/product.entity';

@Entity('machine_tb')
export class MachineEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'machine_name', type: 'text', nullable: false })
  @Length(0)
  @IsNotEmpty()
  machine_name: string;

  @Column({ name: 'location', type: 'text', nullable: false })
  @Length(0)
  @IsNotEmpty()
  location: string;

  @Column({ name: 'address', type: 'text', nullable: false })
  @Length(0)
  @IsNotEmpty()
  address: string;

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

  @OneToMany(() => ProductEntity, (productEntity) => productEntity.machine)
  product: ProductEntity[];
}
