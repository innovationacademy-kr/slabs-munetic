import { ResJSON } from './../../modules/types';
import { RequestHandler } from 'express';
import * as Status from 'http-status';
import * as LessonService from '../../service/lesson.service';
import ErrorResponse from '../../modules/errorResponse';

export const getAllLessons: RequestHandler = async (req, res, next) => {
  try {
    const offset = parseInt(req.query.offset as string, 10);
    const limit = parseInt(req.query.limit as string, 10);
    const lessons = (await LessonService.findLessons(offset, limit, true)) as any;
    res
      .status(Status.OK)
      .json(
        new ResJSON('모든 레슨 프로필을 불러오는데 성공하였습니다.', lessons),
      );
  } catch (err) {
    next(err);
  }
};

export const getUserLessons: RequestHandler = async (req, res, next) => {
  try {
    const offset = parseInt(req.query.offset as string, 10);
    const limit = parseInt(req.query.limit as string, 10);
    const userId = parseInt(req.params.id as string, 10);
    const lessons = (await LessonService.findLessonsByUserId(
      userId,
      offset,
      limit,
      true,
    )) as any;
    res
      .status(Status.OK)
      .json(
        new ResJSON('모든 유저 게시물을 불러오는데 성공하였습니다.', lessons),
      );
  } catch (err) {
    next(err);
  }
};

export const getLessonById: RequestHandler = async (req, res, next) => {
  try {
    const lessonId = parseInt(req.params.id, 10);
    const lesson = await LessonService.findLessonById(lessonId, true);
    res
      .status(Status.OK)
      .json(new ResJSON('레슨 게시물을 불러오는데 성공하였습니다.', lesson));
  } catch (err) {
    next(err);
  }
};
export const deleteLesson: RequestHandler = async (req, res, next) => {
  try {
    const lessonId = parseInt(req.params.id, 10);
    const result = await LessonService.removeLesson(lessonId);
    if (typeof result === 'string')
      throw new ErrorResponse(Status.BAD_REQUEST, result);
    res
      .status(Status.OK)
      .json(new ResJSON('게시물이 정상적으로 삭제되었습니다.', {}));
  } catch (err) {
    next(err);
  }
};

/**
 * 레슨들을 삭제하는 미들웨어
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
 export const delLessons: RequestHandler = async (req, res, next) => {
  try {
    const numbers = req.body as number[];
    if (numbers.length === undefined) {
      next(new ErrorResponse(Status.BAD_REQUEST, '잘못된 요청입니다.'));
    } else {
      let force: boolean = 'true'.localeCompare(req.query.force as string) == 0;
      const del: number = await LessonService.removeLessons(
        numbers,
        force,
      );
      let result: ResJSON = new ResJSON(
        '레슨들을 삭제했습니다.' ,
        del,
      );
      res.status(Status.OK).json(result);
    }
  } catch (err) {
    next(err);
  }
};
