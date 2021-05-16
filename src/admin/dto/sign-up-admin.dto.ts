import { IsNotEmpty, Length, Max, Min } from 'class-validator';

export class SignUpAdminDto {
  @IsNotEmpty()
  @Length(4, 20)
  username: string;

  @IsNotEmpty()
  @Length(0)
  email: string;

  @IsNotEmpty()
  @Length(8, 20)
  password: string;
}
