import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadModel } from './interface/jwtPayload.interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateAccessToken = async (username): Promise<string> => {
    const payload: JwtPayloadModel = { username };
    const accessToken = await this.jwtService.sign(payload);

    return accessToken;
  };
}
