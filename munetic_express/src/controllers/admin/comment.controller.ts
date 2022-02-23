import { RequestHandler } from 'express';
import Status from 'http-status';
import ErrorResponse from '../../modules/errorResponse';
import { ResJSON } from '../../modules/types';
import * as CommentService from '../../service/comment.service';

/**
 * 댓글들을 삭제하는 미들웨어
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
 export const delComments: RequestHandler = async (req, res, next) => {
  try {
    const numbers = req.body as number[];
    if (numbers.length === undefined) {
      next(new ErrorResponse(Status.BAD_REQUEST, '잘못된 요청입니다.'));
    } else {
      let force: boolean = 'true'.localeCompare(req.query.force as string) == 0;
      const del: number = await CommentService.removeComments(
        numbers,
        force,
      );
      let result: ResJSON = new ResJSON(
        '댓글들을 삭제했습니다.' ,
        del,
      );
      res.status(Status.OK).json(result);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * 모든 댓글을 읽어오는 미들웨어
 * GET Request -> 200, 401 Response
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
 export const getAllComments: RequestHandler = async (req, res, next) => {
  try {
    let offset: number | undefined = parseInt(req.query.offset as string);
    let limit: number | undefined = parseInt(req.query.limit as string);
    offset = Number.isNaN(offset) ? undefined : offset;
    limit = Number.isNaN(limit) ? undefined : limit;
    let comments = await CommentService.searchAllComments(offset, limit, true);
    let result: ResJSON = new ResJSON(
      '댓글들을 불러오는데 성공하였습니다.',
      comments,
    );
    res.status(Status.OK).json(result);
  } catch (err) {
    next(err);
  }
};