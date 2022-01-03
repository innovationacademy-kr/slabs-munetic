import { RequestHandler } from 'express';
import * as Status from 'http-status';
import passport from 'passport';
import bcrypt from 'bcrypt';

import { User } from './../../models/user';
import * as UserService from '../../service/user.service';
import * as Reshape from '../../modules/reshape';
import ErrorResponse from '../../modules/errorResponse';
import { ResJSON } from '../../modules/types';
import * as jwt from './../../modules/jwt';

export const login: RequestHandler = async (req, res, next) => {
  try {
    passport.authenticate('admin', async (err, user, info) => {
      if (!user)
        return next(new ErrorResponse(Status.UNAUTHORIZED, info.message));
      const accessToken = await jwt.accessToken(user);
      const { token, cookieOptions } = await jwt.refreshToken(user);
      res.cookie('refreshToken', token, cookieOptions);
      res.status(Status.OK).json(new ResJSON('request success', accessToken));
    })(req, res, next);
  } catch (err) {
    next(err);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  try {
    res.clearCookie('refreshToken');
    res.status(Status.OK).json(new ResJSON('logout complete', {}));
  } catch (err) {
    next(err);
  }
};

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const adminInfo = Reshape.adminObject(req);
    adminInfo.login_password = bcrypt.hashSync(adminInfo.login_password, 10);
    const data = await UserService.createUser(new User({ ...adminInfo }));
    res.status(Status.CREATED).json(new ResJSON('request success', data));
  } catch (err) {
    next(err);
  }
};

export const refresh: RequestHandler = async (req, res, next) => {
  try {
    const accessToken = await jwt.accessToken(req.user);
    const { token, cookieOptions } = await jwt.refreshToken(req.user);
    res.cookie('refreshToken', token, cookieOptions);
    res.status(Status.OK).json(new ResJSON('request success', accessToken));
  } catch (err) {
    next(err);
  }
};
