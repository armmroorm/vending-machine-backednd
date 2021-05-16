import { JwtConstantsModel } from '../interface/jwtConstants.interface';
import * as fs from 'fs';

export const jwtConstants: JwtConstantsModel = {
  jwtStrategyType: 'jwt',
  jwtExpierTime: '28800s',
  jwtAlgorithm: 'RS256',
  jwtPrivateKey: fs.readFileSync('key/private.key'),
  jwtPublicKey: fs.readFileSync('key/public.key.pub'),
};
