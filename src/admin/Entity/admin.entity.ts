import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, Length } from 'class-validator';

@Entity('admin')
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username', type: 'varchar', nullable: false, unique: true })
  @Length(0)
  @IsNotEmpty()
  username: string;

  @Column({ name: 'password', type: 'varchar', nullable: false })
  @Length(0)
  @IsNotEmpty()
  password: string;

  @Column({ name: 'email', type: 'varchar', nullable: false })
  @Length(0)
  @IsNotEmpty()
  email: string;

  @Column({ name: 'role', type: 'varchar', nullable: false })
  @Length(0)
  @IsNotEmpty()
  role: string;
}
