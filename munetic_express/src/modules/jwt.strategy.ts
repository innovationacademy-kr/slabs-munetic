import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import * as Status from 'http-status';
import { User } from '../models/user';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import * as UserService from '../service/user.service';
import passport from 'passport';
import ErrorResponse from './errorResponse';
import { nextTick } from 'process';
import { decode } from 'punycode';

const { development } = require('../config/config');
const { access_secret, refresh_secret, domain } = development;

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: access_secret,
};

const JwtStrategyCallback = async (
  jwt_payload: { sub: any; login_id: any },
  done: any,
) => {
  const [user] = await UserService.search({ login_id: jwt_payload.login_id });
  if (user) {
    return done(null, user.toJSON());
  } else {
    return done(null, null);
  }
};

const JwtStrategy = () => new Strategy(opts, JwtStrategyCallback);

passport.serializeUser(function (user, done) {
  done(null, user);
});

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
  const token = await jwt.sign(payload, refresh_secret, { expiresIn: '7d' });
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

export const checkRefreshToken = async (refreshToken: string, next: any) => {
  try {
    const decoded = (await jwt.verify(refreshToken, refresh_secret)) as {
      login_id: string;
    };
    const [userInfo] = await UserService.search({ login_id: decoded.login_id });
    return userInfo.toJSON();
  } catch (err) {
    if (err instanceof TokenExpiredError)
      throw new ErrorResponse(Status.BAD_REQUEST, err.message);
    next(err);
  }
};

export default JwtStrategy;
