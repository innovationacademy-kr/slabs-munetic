import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as status from 'http-status';
import { Gender } from '../models/user';
import {
  CountRows,
  createLesson,
  editLesson,
  findLesson,
  findLessons,
  findLessonsByUserId,
  LessonAllInfo,
  LessonEditable,
  removeLesson,
} from '../service/lesson.service';
import { ResJSON, ResponseData } from '../types';

// need preprocessing of JSON-parser

export interface LessonRes extends ResponseData {
  lesson_id: number;
  tutor_id: number;
  tutor_name: string;
  gender?: Gender;
  birth: Date;
  phone_number: string | null;
  image_url: string | null;
  editable: LessonEditable;
}

/**
 * check if the argument is a valid `LessonEditable`
 *
 * @param unchecked Unknown parameter to be checked
 */
export const checkLessonEditable = (unchecked: any): LessonEditable | null => {
  let propertyNum = 0;
  if (unchecked && unchecked.category && typeof unchecked.category === 'string')
    propertyNum++;
  if (unchecked && unchecked.title && typeof unchecked.title === 'string')
    propertyNum++;
  if (unchecked && unchecked.price && typeof unchecked.price === 'number')
    propertyNum++;
  if (unchecked && unchecked.location && typeof unchecked.location === 'string')
    propertyNum++;
  if (
    unchecked &&
    unchecked.minute_per_lesson &&
    typeof unchecked.minute_per_lesson === 'number'
  )
    propertyNum++;
  if (unchecked && unchecked.content && typeof unchecked.content === 'string')
    propertyNum++;
  // // check existence and type of each property and turn into 1 thorugh boolean value
  // propertyNum +=
  //   +!!unchecked?.category?.concat?.(' ', 'c') +
  //   +!!unchecked?.title?.concat?.(' ', 'c') +
  //   +!!unchecked?.price?.toString?.() +
  //   +!!unchecked?.location?.concat?.(' ', 'c') +
  //   +!!unchecked?.minute_per_lesson?.concat?.(' ', 'c') +
  //   +!!unchecked?.content?.concat?.(' ', 'c');

  const uncheckedNum = Object.keys(unchecked).length;
  if (uncheckedNum !== 0 && uncheckedNum === propertyNum) return unchecked;
  return null;
};

/**
 * Convert LessonAllInfo to LessonRes
 */
const lessonAllInfoToRes = ({
  lesson_id,
  tutor_id,
  title,
  price,
  location,
  minute_per_lesson,
  content,
  Category: { name: category },
  User: { name, nickname, name_public, phone_number, gender, birth, image_url },
}: LessonAllInfo): LessonRes => {
  return {
    lesson_id,
    tutor_id,
    tutor_name: (name_public ? name : nickname) as string,
    gender,
    birth,
    phone_number,
    image_url,
    editable: {
      category,
      title,
      price,
      location,
      minute_per_lesson,
      content,
    },
  };
};

const processService = <T>(
  promise: Promise<T | string>,
  res: Response,
  next: NextFunction,
  processingFunc: (result: T) => ResponseData,
) => {
  promise
    .then(result => {
      if (typeof result === 'string') {
        res.status(status.BAD_REQUEST).json(new ResJSON(result));
      } else {
        res
          .status(status.OK)
          .json(new ResJSON('응답에 성공하였습니다', processingFunc(result)));
      }
    })
    .catch((err: any) => {
      next(err);
    });
};

const intoArrayFunc = <T, U>(fn: (param: T) => U): ((param: T[]) => U[]) => {
  return function (param: T[]) {
    const retArray: U[] = [];
    for (const elem of param) {
      retArray.push(fn(elem));
    }
    return retArray;
  };
};

export const postLesson: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.query.tutor_id)
    res.status(status.BAD_REQUEST).send('No tutor_id requested');

  const lessonEditable = checkLessonEditable(req.body);
  if (lessonEditable === null) {
    res.status(status.BAD_REQUEST).send('Invalid data passed');
    return;
  }
  if (typeof lessonEditable.category === undefined)
    res.status(status.BAD_REQUEST).send('Category name required');
  if (lessonEditable.title === undefined)
    res.status(status.BAD_REQUEST).send('Title required');

  processService(
    createLesson(parseInt(req.query.tutor_id as string), lessonEditable),
    res,
    next,
    lessonAllInfoToRes,
  );
};

export const getLesson: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  processService(
    findLesson(parseInt(req.params.id)),
    res,
    next,
    lessonAllInfoToRes,
  );
};

export const getLessons: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.query.offset || !req.query.limit)
    res.status(status.BAD_REQUEST).send('offset 혹은 limit이 없습니다.');
  const offset = Number.parseInt(req.query.offset as string);
  const limit = Number.parseInt(req.query.limit as string);
  if (!Number.isInteger(offset) || !Number.isInteger(limit))
    res.status(status.BAD_REQUEST).send('offset 혹은 limit이 정수가 아닙니다.');
  processService(
    findLessons(offset, limit),
    res,
    next,
    function (result: CountRows<LessonAllInfo>) {
      const retCR: CountRows<LessonRes> = { count: result.count, rows: [] };
      for (const elem of result.rows) {
        retCR.rows.push(lessonAllInfoToRes(elem));
      }
      return retCR;
    },
  );
};

export const patchLesson: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.params.id)
    res.status(status.BAD_REQUEST).send('No lesson_id requested');

  const lessonEditable = checkLessonEditable(req.body);
  if (lessonEditable === null) {
    res.status(status.BAD_REQUEST).send(new ResJSON('Invalid data passed'));
    return;
  }

  processService(
    editLesson(parseInt(req.params.id as string), lessonEditable),
    res,
    next,
    lessonAllInfoToRes,
  );
};

export const deleteLesson: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.params.id)
    res.status(status.BAD_REQUEST).send(new ResJSON('레슨 아이디가 없습니다.'));

  processService(removeLesson(parseInt(req.params.id)), res, next, _ => _);
};

export const getUserLessons: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.params.id)
    res.status(status.BAD_REQUEST).send(new ResJSON('레슨 아이디가 없습니다.'));
  if (!req.query.offset || !req.query.limit)
    res.status(status.BAD_REQUEST).send('offset 혹은 limit이 없습니다.');
  const offset = Number.parseInt(req.query.offset as string);
  const limit = Number.parseInt(req.query.limit as string);
  if (!Number.isInteger(offset) || !Number.isInteger(limit))
    res.status(status.BAD_REQUEST).send('offset 혹은 limit이 정수가 아닙니다.');
  processService(
    findLessonsByUserId(parseInt(req.params.id), offset, limit),
    res,
    next,
    function (result: CountRows<LessonAllInfo>) {
      const retCR: CountRows<LessonRes> = { count: result.count, rows: [] };
      for (const elem of result.rows) {
        retCR.rows.push(lessonAllInfoToRes(elem));
      }
      return retCR;
    },
  );
};
