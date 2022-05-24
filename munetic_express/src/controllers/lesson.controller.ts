import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as status from 'http-status';
import { Gender } from '../models/user';
import { LessonAllInfo, CountRows, LessonEditable } from '../types/service/lesson.service';
import * as LessonServive from '../service/lesson.service';
import { ResJSON, ResponseData } from '../modules/types';
import { Lesson } from '../models/lesson';

/**
 * 새 레슨을 저장하는 미들웨어
 * GET Request -> 200, 400 Response
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author Jonghyun Lim
 * @version 1
 */
export const postLesson: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tutor_id: number = parseInt(req.query.tutor_id as string);
    const newLesson: LessonEditable = req.body;

    const lesson_id: number = 0;
    const checkIfDuplicated: boolean = await LessonServive.checkLessonWithUserId(tutor_id, (newLesson.category_id || 0), lesson_id);

    if (Number.isNaN(tutor_id)) {
      res.status(status.BAD_REQUEST).send('wrong tutor ID');
    } else if (!newLesson) {
      res.status(status.BAD_REQUEST).send('Invalid data passed');
    } else if (checkIfDuplicated) {
      res.status(status.BAD_REQUEST).send('Already existed in same category');
    }
    else {
      const response = await LessonServive.createLesson(tutor_id, newLesson);
      const result: ResJSON = new ResJSON(
        '응답에 성공하였습니다.',
        response,
      );
      res.status(status.OK).json(result);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * 레슨 ID에 대한 레슨을 가져오는 미들웨어
 * GET Request -> 200, 400 Response
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author Jonghyun Lim
 * @version 1
 */
export const getLesson: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user_id: number = parseInt(req.params.id as string);
    if (Number.isNaN(user_id) || user_id < 0) {
      res.status(status.BAD_REQUEST).send('offset / limit / user ID error');
    } else {
      const response = await LessonServive.findLessonById(user_id, false);
      const result: ResJSON = new ResJSON(
        '응답에 성공하였습니다.',
        response,
      );
      res.status(status.OK).json(result);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * offset, limit 범위만큼 카테고리 별 레슨을 가져오는 미들웨어 (카테고리 입력 안하면 전체 조회)
 * GET Request -> 200, 400 Response
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 * @version 2
 */
export const getLessons: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const offset: number = parseInt(req.query.offset as string);
    const limit: number = parseInt(req.query.limit as string);
    const category_id: number = parseInt(req.params.category_id as string);
    if (Number.isNaN(offset) || Number.isNaN(limit) || offset < 0 || limit < 0) {
      res.status(status.BAD_REQUEST).send('offset / limit error');
    } else {
      const cid = Number.isNaN(category_id) ? 0 : category_id;
      const data = await LessonServive.findLessons(offset, limit, false, cid);
      const result: ResJSON = new ResJSON(
        '응답에 성공하였습니다.',
        data,
      );
      res.status(status.OK).json(result);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * 레슨을 수정하는 미들웨어
 * GET Request -> 200, 400 Response
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author Jonghyun Lim
 * @version 1
 */
export const patchLesson: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const lessonEditable = req.body as LessonEditable;
    const lesson_id: number = parseInt(req.params.id as string);

    const checkIfDuplicated: boolean = await LessonServive.checkLessonWithUserId((lessonEditable.tutor_id || 0), (lessonEditable.category_id || 0), lesson_id);

    if (!lessonEditable || Number.isNaN(lesson_id) || lesson_id < 0) {
      res.status(status.BAD_REQUEST).send('Invalid data');
    } else if (checkIfDuplicated) {
      res.status(status.BAD_REQUEST).send('Already existed in same category');
    } else {
      const response = await LessonServive.editLesson(lesson_id, lessonEditable);
      const result: ResJSON = new ResJSON(
        '응답에 성공하였습니다.',
        response,
      );
      res.status(status.OK).json(result);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * 레슨을 삭제하는 미들웨어
 * GET Request -> 200, 400 Response
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author Jonghyun Lim
 * @version 1
 */
export const deleteLesson: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const lesson_id: number = parseInt(req.params.id as string);
    if (Number.isNaN(lesson_id) || lesson_id < 0) {
      res.status(status.BAD_REQUEST).send('Invalid lesson ID');
    } else {
      const response = await LessonServive.removeLesson(lesson_id);
      const result: ResJSON = new ResJSON(
        '응답에 성공하였습니다.',
        response,
      );
      res.status(status.OK).json(result);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * 특정 사용자의 레슨들을 가져오는 미들웨어
 * GET Request -> 200, 400 Response
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author Jonghyun Lim
 * @version 1
 */
export const getUserLessons: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const offset: number = parseInt(req.query.offset as string);
    const limit: number = parseInt(req.query.limit as string);
    const user_id: number = parseInt(req.params.id as string);
    if (Number.isNaN(offset) || Number.isNaN(limit) || Number.isNaN(user_id) || offset < 0 || limit < 0 || user_id < 0) {
      res.status(status.BAD_REQUEST).send('offset / limit / user ID error');
    } else {
      const response: Lesson[] = await LessonServive.findLessonsByUserId(user_id, offset, limit, false);
      const result: ResJSON = new ResJSON(
        '응답에 성공하였습니다.',
        response,
      );
      res.status(status.OK).json(result);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * 끌어올리기 기능을 위한 미들웨어
 * 성공시 status 200, 실패시 status 400 
 * 
 * @param req 
 * @param res 
 * @param next 
 * @author sungkim
 */

export const updateLessonOrder: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const lessonId: number = parseInt(req.params.id as string);
    const response: boolean = await LessonServive.updateLessonOrderByButton(lessonId);

    const result: ResJSON = new ResJSON(
      '응답에 성공하였습니다.',
      response,
    );
    res.status(status.OK).json(result);
  } catch (err) {
    next(err);
  }
}

/**
 * offset, limit 범위만큼 카테고리 별 레슨을 가져오는 미들웨어 (카테고리 입력 안하면 전체 조회)
 * GET Request -> 200, 400 Response
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author JaeGu Jeong
 * @version 1
 */
export const getLessonsAll: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const offset: number = parseInt(req.query.offset as string);
    const limit: number = parseInt(req.query.limit as string);
    if (Number.isNaN(offset) || Number.isNaN(limit) || offset < 0 || limit < 0) {
      res.status(status.BAD_REQUEST).send('offset / limit error');
    } else {
      const data = await LessonServive.findLessonsAll(offset, limit, false);
      const result: ResJSON = new ResJSON(
        '응답에 성공하였습니다.',
        data,
      );
      res.status(status.OK).json(result);
    }
  } catch (err) {
    next(err);
  }
};