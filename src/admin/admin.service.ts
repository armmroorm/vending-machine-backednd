import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './Entity/admin.entity';
import { Repository } from 'typeorm';
import { SignUpAdminDto } from './dto/sign-up-admin.dto';
import * as bcrypt from 'bcrypt';
import { SignInAdminDto } from './dto/sign-in-admin.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private authService: AuthService,
  ) {}

  signUp = async (signUpAdminDto: SignUpAdminDto): Promise<any> => {
    const { username, password } = signUpAdminDto;
    const admin = new Admin();
    admin.username = username;
    const salt = await bcrypt.genSalt();
    admin.password = await bcrypt.hash(password, salt);
    admin.role = 'admin';

    try {
      await admin.save();
      return {
        message: 'Sign up successfully',
      };
    } catch (e) {
      if (e.errno === 1062) {
        throw new ConflictException('Username already exist');
      }
      throw new InternalServerErrorException();
    }
  };

  signIn = async (signInAdminDto: SignInAdminDto): Promise<Object> => {
    const { username, password } = signInAdminDto;
    const admin = await this.adminRepository.findOne({ username });

    try {
      const passwordMatchChecker = await bcrypt.compare(
        password,
        admin.password,
      );

      if (passwordMatchChecker) {
        const accessToken = {
          tokenKey: await this.authService.generateAccessToken(admin.username),
        };

        return accessToken;
      } else {
        throw new UnauthorizedException('Invalid authorize');
      }
    } catch (e) {
      throw new UnauthorizedException('Invalid authorize');
    }
  };

  QueryById = async (id) => {
    const admin = await this.adminRepository.findOne(id);

    if (!admin) {
      throw new NotFoundException(`Admin with id : ${id} not found`);
    }

    return admin;
  };
}
