import { Request } from 'express';
import { Op } from 'sequelize';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import * as UserService from '../service/user.service';
import passport from 'passport';

const { development } = require('../config/config');
const { access_secret, refresh_secret } = development;

export const accessOpts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: access_secret,
};

export const cookieExtractor = function (req: Request) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies['refreshToken'];
  }
  return token;
};

export const refreshOpts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  ignoreExpiration: false,
  secretOrKey: refresh_secret,
};

const JwtStrategyCallback = async (
  jwt_payload: { sub: any; login_id: any },
  done: any,
) => {
  const [user] = await UserService.searchActiveUser({
    login_id: jwt_payload.login_id,
    type: {
      [Op.or]: ['Tutor', 'Student'],
    },
  });
  if (user) {
    return done(null, user.toJSON());
  } else {
    return done(null, false);
  }
};

export const JwtAccessStrategy = () =>
  new Strategy(accessOpts, JwtStrategyCallback);

export const JwtRefreshStrategy = () =>
  new Strategy(refreshOpts, JwtStrategyCallback);

export const jwtAuth = () => passport.authenticate('jwt', { session: false });

export const jwtReAuth = () =>
  passport.authenticate('jwtRefresh', { session: false });
