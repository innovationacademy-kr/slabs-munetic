import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { Request } from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import * as UserService from '../service/user.service';

const { development } = require('../config/config');
const { access_secret, refresh_secret, domain } = development;

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: access_secret,
  issuer: 'munetic_api',
};

const JwtStrategyCallback = async (
  jwt_payload: { sub: any; login_id: any },
  done: any,
) => {
  const [user] = await UserService.search({ login_id: jwt_payload.login_id });
  if (user) {
    return done(null, user);
  } else {
    return done(null, null);
  }
};

const JwtStrategy = () => new Strategy(opts, JwtStrategyCallback);

export const accessToken = async (user: User) => {
  const payload = {
    sub: user.id,
    login_id: user.login_id,
  };
  const token = await jwt.sign(payload, access_secret, { expiresIn: '24h' });
  return token;
};

export const refreshToken = async (user: User) => {
  const payload = {
    id: user.id,
    login_id: user.login_id,
  };
  const token = await jwt.sign(payload, refresh_secret, { expiresIn: '3d' });
  const decoded = jwt.decode(token) as any;
  const cookieOptions = {
    domain: `${domain}`,
    path: '/',
    expires: new Date(decoded.exp * 1000),
    sameSite: 'strict' as 'strict',
    httpOnly: true,
    // secure: true, //https 환경에서 on합니다.
  };
  return { token, cookieOptions };
};

export default JwtStrategy;
