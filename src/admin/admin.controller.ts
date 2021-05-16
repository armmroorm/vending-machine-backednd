import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { SignUpAdminDto } from './dto/sign-up-admin.dto';
import { SignInAdminDto } from './dto/sign-in-admin.dto';
import { Response } from 'express';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('signup')
  async signUp(
    @Body(ValidationPipe) signUpAdminDto: SignUpAdminDto,
    @Res() res: Response,
  ) {
    const data = await this.adminService.signUp(signUpAdminDto);
    res.status(HttpStatus.OK).send(data);
  }

  @Post('signin')
  async signin(
    @Body(ValidationPipe) signInAdminDto: SignInAdminDto,
    @Res() res: Response,
  ) {
    const data = await this.adminService.signIn(signInAdminDto);
    res.status(HttpStatus.OK).send(data);
  }
}
