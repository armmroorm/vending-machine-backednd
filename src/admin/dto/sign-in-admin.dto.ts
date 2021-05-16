import { IsNotEmpty } from 'class-validator';

export class SignInAdminDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
