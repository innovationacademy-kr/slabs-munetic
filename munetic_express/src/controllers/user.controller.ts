import { RequestHandler } from 'express';
import * as Status from 'http-status';
import ErrorResponse from '../modules/errorResponse';
import { ResJSON } from '../modules/types';
import * as UserService from '../service/user.service';

export const getAllUserProfile: RequestHandler = async (req, res, next) => {
  try {
    if (req.user) {
      let result: ResJSON;
      const users = await UserService.findAllUser(Number(req.query.page));
      result = new ResJSON(
        '모든 유저 프로필을 불러오는데 성공하였습니다.',
        users,
      );
      res.status(Status.OK).json(result);
    } else {
      next(new ErrorResponse(Status.UNAUTHORIZED, '로그인이 필요합니다.'));
    }
  } catch (err) {
    next(err);
  }
};

export const getMyProfile: RequestHandler = async (req, res, next) => {
  try {
    if (req.user) {
      let result: ResJSON;
      const userData = req.user;
      delete userData.login_password;
      result = new ResJSON(
        '유저 프로필을 불러오는데 성공하였습니다.',
        userData,
      );
      res.status(Status.OK).json(result);
    } else {
      next(new ErrorResponse(Status.UNAUTHORIZED, '로그인이 필요합니다.'));
    }
  } catch (err) {
    next(err);
  }
};

export const getUserProfile: RequestHandler = async (req, res, next) => {
  try {
    if (!req.params.id) {
      res.status(Status.BAD_REQUEST).send('유저 아이디가 없습니다.');
    }
    let result: ResJSON;
    const user = await UserService.findUserById(Number(req.params.id));
    result = new ResJSON('유저 프로필을 불러오는데 성공하였습니다.', user);
    res.status(Status.OK).json(result);
  } catch (err) {
    next(err);
  }
};

export const editUserProfile: RequestHandler = async (req, res, next) => {
  try {
    if (req.user) {
      let result: ResJSON;
      const user = await UserService.editUserById(
        Number(req.user.id),
        req.body,
      );
      result = new ResJSON('유저 프로필을 수정하는데 성공하였습니다.', user);
      res.status(Status.OK).json(result);
    } else {
      next(new ErrorResponse(Status.UNAUTHORIZED, '로그인이 필요합니다.'));
    }
  } catch (err) {
    next(err);
  }
};
