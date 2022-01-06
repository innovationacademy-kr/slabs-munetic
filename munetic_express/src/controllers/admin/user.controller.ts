import { RequestHandler } from 'express';
import * as Status from 'http-status';

import { ResJSON } from '../../modules/types';
import ErrorResponse from '../../modules/errorResponse';
import * as UserService from '../../service/user.service';

export const getAppUserList: RequestHandler = async (req, res, next) => {
  try {
    if (req.user) {
      let result: ResJSON;
      const users = await UserService.findAllAppUser(Number(req.query.page));
      result = new ResJSON(
        '모든 유저 프로필을 불러오는데 성공하였습니다.',
        users,
      );
      res.status(Status.OK).json(result);
    } else {
      throw new ErrorResponse(
        Status.UNAUTHORIZED,
        '권한이 없습니다. 관리자에게 문의해주세요.',
      );
    }
  } catch (err) {
    next(err);
  }
};

export const getAdminUserList: RequestHandler = async (req, res, next) => {
  try {
    if (req.user?.type === 'Owner') {
      let result: ResJSON;
      const users = await UserService.findAllAdminUser(Number(req.query.page));
      result = new ResJSON(
        '모든 어드민 유저 프로필을 불러오는데 성공하였습니다.',
        users,
      );
      res.status(Status.OK).json(result);
    } else {
      next(
        new ErrorResponse(
          Status.UNAUTHORIZED,
          '권한이 없습니다. 관리자에게 문의해주세요.',
        ),
      );
    }
  } catch (err) {
    next(err);
  }
};

export const doubleCheck: RequestHandler = async (req, res, next) => {
  try {
    const userList = await UserService.searchAllUser(req.query);
    if (userList.length === 0) {
      res
        .status(Status.OK)
        .json(new ResJSON('사용할 수 있는 유저 정보 입니다.', {}));
    } else
      throw new ErrorResponse(
        Status.BAD_REQUEST,
        '이미 존재하는 유저 정보 입니다.',
      );
  } catch (err) {
    next(err);
  }
};
