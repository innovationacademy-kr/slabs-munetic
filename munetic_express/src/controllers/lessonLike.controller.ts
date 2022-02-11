import { RequestHandler } from 'express';
import * as Status from 'http-status';
import ErrorResponse from '../modules/errorResponse';
import { ResJSON } from '../modules/types';
import * as LessonLikeService from '../service/lessonLike.service';
import { LessonLike } from '../models/lessonLike';

/**
 * 유저가 좋아요를 누른 강의들을 읽어오는 미들웨어
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
export const getLessonLikes: RequestHandler = async (req, res, next) => {
  try {
    if (req.user) {
      const likes = await LessonLikeService.searchAllLessonLikes(req.user.id);
      const result: ResJSON = new ResJSON(
        '좋아요 항목들을 불러오는데 성공하였습니다.',
        likes,
      );
      res.status(Status.OK).json(result);
    } else {
      next(new ErrorResponse(Status.UNAUTHORIZED, '로그인이 필요합니다.'));
    }
  } catch (err) {
    next(err);
  }
};

/**
 * 강의에 좋아요 누른 사람들을 가져오는 미들웨어
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
export const getLikedPeoples: RequestHandler = async (req, res, next) => {
  try {
    if (req.user) {
      const likes = await LessonLikeService.getLikedPeoples(parseInt(req.params.lesson_id, 10));
      const result: ResJSON = new ResJSON(
        '강의에 좋아요 누른 사람들을 불러오는데 성공하였습니다.',
        likes,
      );
      res.status(Status.OK).json(result);
    } else {
      next(new ErrorResponse(Status.UNAUTHORIZED, '로그인이 필요합니다.'));
    }
  } catch (err) {
    next(err);
  }
};

/**
 * 유저가 레슨(lesson_id)을 좋아요 눌렀는지의 여부를 읽어오는 미들웨어
 * 
 * @param req request Object
 * @param res response Object
 * @param next next middleware function Object
 * @author joohongpark
 */
export const getLessonLike: RequestHandler = async (req, res, next) => {
  try {
    if (req.user) {
      const likes = await LessonLikeService.searchLessonLike(
        req.user.id,
        parseInt(req.params.lesson_id, 10),
      );
      const result: ResJSON = new ResJSON(
        '좋아요 여부를 확인하는데 성공하였습니다.',
        likes,
      );
      res.status(Status.OK).json(result);
    } else {
      next(new ErrorResponse(Status.UNAUTHORIZED, '로그인이 필요합니다.'));
    }
  } catch (err) {
    next(err);
  }
};

/**
 * 유저가 레슨(lesson_id)에 대해 좋아요를 설정하는 미들웨어
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
export const putLessonLike: RequestHandler = async (req, res, next) => {
  try {
    if (req.user) {
      const ok: boolean = await LessonLikeService.setLessonLike(
        req.user.id,
        parseInt(req.params.lesson_id, 10),
        true,
      );
      const result: ResJSON = new ResJSON(
        ok ? '좋아요 데이터를 저장하는데 성공하였습니다.' : '좋아요 데이터를 저장하는데 실패하였습니다.',
        ok,
      );
      res.status(Status.CREATED).json(result);
    } else {
      next(new ErrorResponse(Status.UNAUTHORIZED, '로그인이 필요합니다.'));
    }
  } catch (err) {
    next(err);
  }
};

/**
 * 유저가 레슨(lesson_id)에 대해 좋아요를 해제하는 미들웨어
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
export const delLessonLike: RequestHandler = async (req, res, next) => {
  try {
      if (req.user) {
        const ok: boolean = await LessonLikeService.setLessonLike(
          req.user.id,
          parseInt(req.params.lesson_id, 10),
          false,
        );
        const result: ResJSON = new ResJSON(
          ok ? '좋아요 데이터를 삭제하는데 성공하였습니다.' : '좋아요 데이터를 삭제하는데 실패하였습니다.',
          ok,
        );
        res.status(Status.OK).json(result);
      } else {
        next(new ErrorResponse(Status.UNAUTHORIZED, '로그인이 필요합니다.'));
      }
    } catch (err) {
      next(err);
    }
};