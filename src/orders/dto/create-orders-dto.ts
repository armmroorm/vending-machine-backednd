import { IsInt, IsNotEmpty, Length, Min } from 'class-validator';

export class CreateOrdersDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  productId: number;

  @IsNotEmpty()
  totalPrice: number;

  @IsNotEmpty()
  totalNumber: number;
}
