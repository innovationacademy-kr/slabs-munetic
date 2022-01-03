import { RequestHandler } from 'express';
import * as Status from 'http-status';

import { ResJSON } from '../../modules/types';
import ErrorResponse from '../../modules/errorResponse';
import * as UserService from '../../service/user.service';

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
