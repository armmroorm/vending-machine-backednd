import { IsNotEmpty, Length } from 'class-validator';

export class UpdateMachineDto {
  @IsNotEmpty()
  @Length(0)
  machineName: string;

  @IsNotEmpty()
  @Length(0)
  location: string;

  @IsNotEmpty()
  @Length(0)
  address: string;
}
