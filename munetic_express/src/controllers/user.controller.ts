import { RequestHandler } from 'express';
import * as Status from 'http-status';
import { ResJSON } from '../modules/types';
import * as UserService from '../service/user.service';

export const getAllUserProfile: RequestHandler = async (req, res, next) => {
  try {
    let result: ResJSON;
    const users = await UserService.findAllUser(Number(req.query.page));
    result = new ResJSON(
      '모든 유저 프로필을 불러오는데 성공하였습니다.',
      users,
    );
    res.status(Status.OK).json(result);
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
    if (!req.params.id) {
      res.status(Status.BAD_REQUEST).send('유저 아이디가 없습니다.');
    }
    let result: ResJSON;
    const user = await UserService.editUserById(
      Number(req.params.id),
      req.body,
    );
    result = new ResJSON('유저 프로필을 수정하는데 성공하였습니다.', user);
    res.status(Status.OK).json(result);
  } catch (err) {
    next(err);
  }
};
