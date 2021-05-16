import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadModel } from './interface/jwtPayload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../admin/Entity/admin.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { jwtConstants } from './constants/jwt.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.jwtPublicKey,
      algorithms: [jwtConstants.jwtAlgorithm],
    });
  }

  validate = async (payload: JwtPayloadModel): Promise<Object> => {
    const { username } = payload;
    const admin = await this.adminRepository.findOne({ username });
    if (!admin) {
      throw new UnauthorizedException();
    }
    return admin;
  };
}
