import { RequestHandler } from 'express';
import * as Status from 'http-status';
import { ResJSON } from '../modules/types';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import * as Reshape from './../modules/reshape';
import * as AuthService from '../service/auth.service';
import * as UserService from '../service/user.service';
import ErrorResponse from '../modules/errorResponse';

export const login: RequestHandler = (req, res) => {
  try {
  } catch {}
};

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const userInfo = Reshape.userObject(req);
    userInfo.login_password = bcrypt.hashSync(userInfo.login_password, 10);
    const data = await AuthService.createAccount(new User({ ...userInfo }));
    console.log(data);
    const result = new ResJSON('request success', data.toJSON());
    res.status(Status.CREATED).json(result);
  } catch (err) {
    next(err);
  }
};

export const isValidInfo: RequestHandler = async (req, res, next) => {
  try {
    let result: ResJSON;
    const userList = await UserService.search(req.query);
    if (userList.length === 0) {
      result = new ResJSON('사용할 수 있는 유저 정보 입니다.', {});
      res.status(Status.OK).json(result);
    } else
      throw new ErrorResponse(
        Status.BAD_REQUEST,
        '이미 존재하는 유저 정보 입니다.',
      );
  } catch (err) {
    next(err);
  }
};
