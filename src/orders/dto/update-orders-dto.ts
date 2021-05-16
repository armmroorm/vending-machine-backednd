import { IsInt, IsNotEmpty, Length, Min } from 'class-validator';

export class UpdateOrdersDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  productId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  machineId: number;

  @IsNotEmpty()
  @Length(0)
  productName: string;

  @IsNotEmpty()
  @Length(0)
  orderSn: string;

  @IsNotEmpty()
  totalPrice: number;

  @IsNotEmpty()
  totalNumber: number;
}
