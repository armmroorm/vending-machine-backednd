import { IsInt, IsNotEmpty, Length, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  machineId: number;

  @IsNotEmpty()
  @Length(0)
  productName: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  number: number;
}
