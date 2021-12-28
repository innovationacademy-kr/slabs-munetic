import { RequestHandler } from 'express';

import { User } from '../models/user';
import * as Reshape from './../modules/reshape';
import * as AuthService from '../service/auth.service';

export const login: RequestHandler = (req, res) => {
  try {
  } catch {}
};

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const userInfo = Reshape.userObject(req);
    const result = await AuthService.createUser(new User({ ...userInfo }));
    res.status(result.status).json(result.resData);
  } catch (err) {
    next(err);
  }
};

export const isValidInfo: RequestHandler = async (req, res, next) => {
  try {
    const { login_id, email } = req.query as {
      login_id?: string;
      email?: string;
    };
    const result = await AuthService.checkAlreadyExists(login_id, email);
    res.status(result.status).json(result.resData);
  } catch (err) {
    next(err);
  }
};
