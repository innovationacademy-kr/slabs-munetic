import { RequestHandler } from 'express';
import * as Status from 'http-status';
import passport from 'passport';
import bcrypt from 'bcrypt';

import { User } from '../models/user';
import { ResJSON } from '../modules/types';
import ErrorResponse from '../modules/errorResponse';
import * as Reshape from './../modules/reshape';
import * as jwt from './../modules/jwt.strategy';
import * as UserService from '../service/user.service';

/**
 * 로그인
 */
export const login: RequestHandler = (req, res, next) => {
  try {
    passport.authenticate('local', async (err, user, info) => {
      if (!user) next(new ErrorResponse(Status.UNAUTHORIZED, info.message));
      const accessToken = await jwt.accessToken(user);
      const { token, cookieOptions } = await jwt.refreshToken(user);
      res.cookie('refreshToken', token, cookieOptions);
      res.status(Status.OK).json(new ResJSON('request success', accessToken));
    })(req, res, next);
  } catch (err) {
    next(err);
  }
};

/**
 * 로그아웃
 */
export const logout: RequestHandler = (req, res, next) => {
  try {
    res.clearCookie('refreshToken');
    res.status(Status.OK).json(new ResJSON('logout complete', {}));
  } catch (err) {
    next(err);
  }
};

/**
 * 회원가입
 */
export const signup: RequestHandler = async (req, res, next) => {
  try {
    const userInfo = Reshape.userObject(req);
    userInfo.login_password = bcrypt.hashSync(userInfo.login_password, 10);
    const data = await UserService.createUser(new User({ ...userInfo }));
    res.status(Status.CREATED).json(new ResJSON('request success', data));
  } catch (err) {
    next(err);
  }
};

/**
 * 로그인 상태 체크
 */
export const accessCheck: RequestHandler = async (req, res, next) => {
  try {
    res
      .status(Status.OK)
      .json(new ResJSON('authorized', { login_id: req.user }));
  } catch (err) {
    next(err);
  }
};

/**
 * accessToken 갱신
 */

export const refresh: RequestHandler = async (req, res, next) => {
  try {
    const refreshToken = req.cookies['refreshToken'];
    if (refreshToken) {
      const payload = await jwt.checkRefreshToken(refreshToken, next);
      if (!payload)
        throw new ErrorResponse(
          Status.BAD_REQUEST,
          '해당하는 계정 정보가 없습니다.',
        );
      const accessToken = await jwt.accessToken(payload as User);
      res.status(Status.OK).json(new ResJSON('request success', accessToken));
    } else {
      throw new ErrorResponse(
        Status.BAD_REQUEST,
        'refresh token이 존재하지 않습니다.',
      );
    }
  } catch (err) {
    next(err);
  }
};

/**
 * 아이디/이메일/닉네임 중복검사
 */
export const isValidInfo: RequestHandler = async (req, res, next) => {
  try {
    const userList = await UserService.search(req.query);
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
