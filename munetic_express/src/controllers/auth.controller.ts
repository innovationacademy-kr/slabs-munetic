import { RequestHandler } from 'express';
import status from 'http-status';

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
    console.log(result.resData);
    res.status(result.status).json(result.resData);
  } catch (err) {
    next(err);
  }
};

// 아이디 중복 확인
// 이메일 중복 확인
//
