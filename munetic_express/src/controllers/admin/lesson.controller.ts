import { findAllLessonsByUserId } from './../../service/lesson.service';
import { ResJSON } from './../../types';
import { RequestHandler } from 'express';
import * as Status from 'http-status';
import * as LessonService from '../../service/lesson.service';
import ErrorResponse from '../../modules/errorResponse';

export const getAllLessons: RequestHandler = async (req, res, next) => {
  try {
    const offset = parseInt(req.query.offset as string, 10);
    const limit = parseInt(req.query.limit as string, 10);
    const lessons = (await LessonService.findAllLessons(offset, limit)) as any;
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
    const lessons = (await LessonService.findAllLessonsByUserId(
      userId,
      offset,
      limit,
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
    const lesson = await LessonService.findLessonById(lessonId);
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
