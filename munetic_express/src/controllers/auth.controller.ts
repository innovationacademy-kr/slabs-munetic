import { RequestHandler } from 'express';
import status from 'http-status';

import { User } from '../models/user';
import * as Reshape from './../modules/reshape';
import * as AuthService from '../service/auth.service';

export const login: RequestHandler = (req, res) => {
  try {
  } catch {}
};

export const signup: RequestHandler = async (req, res) => {
  const userInfo = Reshape.newUserObject(req);
  const createdUser = await AuthService.createUser(new User({ ...userInfo }));
  if (createdUser)
    res
      .status(status.CREATED)
      .json({ message: 'SUCCESS!', data: { ...createdUser.toJSON() } });
  else
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: 'FAILED, INTERNAL SERVER ERROR' });
};

// 아이디 중복 확인
// 이메일 중복 확인
//
