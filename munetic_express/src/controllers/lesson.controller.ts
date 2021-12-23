import { Request, RequestHandler, Response } from 'express';
import { BAD_REQUEST } from 'http-status';
import {
  createLesson,
  editLesson,
  findLesson,
  removeLesson,
} from '../service/lesson.service';
import { ServiceResponse } from '../types';

// need preprocessing of JSON-parser

export const postLesson: RequestHandler = (req: Request, res: Response) => {
  if (!req.query.tutor_id)
    res.status(BAD_REQUEST).send('No tutor_id requested');

  createLesson(parseInt(req.query.tutor_id as string), req.body)
    .then((result: ServiceResponse) => {
      res.status(result.status).json(result.resData).send();
    })
    .catch((err: ServiceResponse) => {
      res.status(err.status).send(err.resData);
    });
};

export const getLesson: RequestHandler = (req: Request, res: Response) => {
  if (!req.params.id) res.status(BAD_REQUEST).send('No lesson_id requested');

  findLesson(parseInt(req.params.id))
    .then((result: ServiceResponse) => {
      res.status(result.status).json(result.resData).send();
    })
    .catch((err: ServiceResponse) => {
      res.status(err.status).send(err.resData);
    });
};

export const patchLesson: RequestHandler = (req: Request, res: Response) => {
  if (!req.params.id) res.status(BAD_REQUEST).send('No lesson_id requested');

  editLesson(parseInt(req.params.id as string), req.body)
    .then((result: ServiceResponse) => {
      res.status(result.status).json(result.resData).send();
    })
    .catch((err: ServiceResponse) => {
      res.status(err.status).send(err.resData);
    });
};

export const deleteLesson: RequestHandler = (req: Request, res: Response) => {
  if (!req.params.id) res.status(BAD_REQUEST).send('No lesson_id requested');

  removeLesson(parseInt(req.params.id))
    .then((result: ServiceResponse) => {
      res.status(result.status).json(result.resData).send();
    })
    .catch((err: ServiceResponse) => {
      res.status(err.status).send(err.resData);
    });
};
