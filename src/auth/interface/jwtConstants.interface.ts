import { Algorithm } from 'jsonwebtoken';

export interface JwtConstantsModel {
  jwtStrategyType: string;
  jwtExpierTime: string;
  jwtAlgorithm: Algorithm;
  jwtPrivateKey: string | Buffer;
  jwtPublicKey: string | Buffer;
}
