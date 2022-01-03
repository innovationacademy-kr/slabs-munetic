import { Op } from 'sequelize';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import {
  accessOpts,
  refreshOpts,
  cookieExtractor,
  JwtRefreshStrategy,
} from './jwt.local.strategy';
import * as UserService from '../service/user.service';
import passport from 'passport';

const { development } = require('../config/config');
const { access_secret } = development;

const JwtAdminStrategyCallback = async (
  jwt_payload: { sub: any; login_id: any },
  done: any,
) => {
  const [user] = await UserService.searchActiveUser({
    login_id: jwt_payload.login_id,
    type: { [Op.or]: ['Admin', 'Owner'] },
  });
  if (user) {
    return done(null, user.toJSON());
  } else {
    return done(null, false);
  }
};

export const JwtAdminAccessStrategy = () =>
  new Strategy(accessOpts, JwtAdminStrategyCallback);
export const JwtAdminRefreshStrategy = () =>
  new Strategy(refreshOpts, JwtAdminStrategyCallback);

passport.serializeUser(function (user, done) {
  done(null, user);
});
