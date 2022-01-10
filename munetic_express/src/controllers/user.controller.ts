import { RequestHandler } from 'express';
import * as Status from 'http-status';
import multer from 'multer';
import path from 'path';
import ErrorResponse from '../modules/errorResponse';
import { ResJSON } from '../modules/types';
import * as UserService from '../service/user.service';

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
      const user = (await UserService.editUserById(
        Number(req.user.id),
        req.body,
      )) as any;
      result = new ResJSON('유저 프로필을 수정하는데 성공하였습니다.', user);
      res.status(Status.OK).json(result);
    } else {
      next(new ErrorResponse(Status.UNAUTHORIZED, '로그인이 필요합니다.'));
    }
  } catch (err) {
    next(err);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../munetic_app/public/img');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + '-' + Date.now() + ext);
  },
});

const storageConfig = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    if (
      ext !== '.png' &&
      ext !== '.jpg' &&
      ext !== '.jpeg' &&
      ext !== '.gif' &&
      ext !== '.svg'
    ) {
      return callback(new Error('이미지 형식이 잘못됐습니다.'));
    }
    callback(null, true);
  },
});

export const imgUpload: RequestHandler = (req, res, next) => {
  return storageConfig.single('img')(req, res, next);
};

export const createProfileImg: RequestHandler = async (req, res, next) => {
  try {
    if (req.user) {
      let result: ResJSON;
      result = new ResJSON(
        '프로필 사진 교체를 성공하였습니다.',
        req.file?.filename,
      );
      res.status(Status.OK).json(result);
    } else {
      next(new ErrorResponse(Status.UNAUTHORIZED, '로그인이 필요합니다.'));
    }
  } catch (err) {
    next(err);
  }
};
