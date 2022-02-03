import { Op } from 'sequelize';
import passport from 'passport';
import { Strategy } from 'passport-jwt';

import * as UserService from '../service/user.service';
import { accessOpts, refreshOpts } from './jwt.local.strategy';

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

export const jwtAdminAuth = () =>
  passport.authenticate('jwt-admin', { session: false });

export const jwtReAdminAuth = () =>
  passport.authenticate('jwtRefresh-admin', { session: false });
