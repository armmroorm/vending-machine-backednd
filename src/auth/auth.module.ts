import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../admin/Entity/admin.entity';
import { jwtConstants } from './constants/jwt.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    PassportModule.register({ defaultStrategy: jwtConstants.jwtStrategyType }),
    JwtModule.register({
      privateKey: jwtConstants.jwtPrivateKey,
      publicKey: jwtConstants.jwtPublicKey,
      signOptions: {
        expiresIn: jwtConstants.jwtExpierTime,
        algorithm: jwtConstants.jwtAlgorithm,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
