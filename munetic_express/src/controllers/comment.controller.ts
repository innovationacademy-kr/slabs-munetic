import { RequestHandler } from 'express';
import Status from 'http-status';
import ErrorResponse from '../modules/errorResponse';
import { ResJSON } from '../modules/types';
import * as CommentService from '../service/comment.service';

/**
 * 유저에 대한 모든 댓글을 읽어오는 미들웨어
 * GET Request -> 200, 401 Response
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
export const getCommentsByUserId: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      next(new ErrorResponse(Status.UNAUTHORIZED, '로그인이 필요합니다.'));
    } else {
      let comments = await CommentService.searchAllCommentsByUserId(
        req.params.user_id
      );
      let result: ResJSON = new ResJSON(
        '유저에 대한 댓글들을 불러오는데 성공하였습니다.',
        comments,
      );
      res.status(Status.OK).json(result);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * 레슨에 대한 모든 댓글을 읽어오는 미들웨어
 * GET Request -> 200, 400, 401 Response
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
export const getCommentsByLessonId: RequestHandler = async (req, res, next) => {
  try {
    let lesson_id: number = parseInt(req.params.lesson_id, 10); 
    if (Number.isNaN(lesson_id)) {
      next(new ErrorResponse(Status.BAD_REQUEST, '레슨 ID엔 숫자만 올 수 있습니다.'));
    } else if (!req.user) {
      next(new ErrorResponse(Status.UNAUTHORIZED, '로그인이 필요합니다.'));
    } else {
      let comments = await CommentService.searchAllCommentsByLessonId(
        lesson_id,
      );
      let result: ResJSON = new ResJSON(
        '레슨에 대한 댓글들을 불러오는데 성공하였습니다.',
        comments,
      );
      res.status(Status.OK).json(result);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * 레슨에 댓글을 추가하는 미들웨어
 * GET Request -> 200, 400, 401 Response
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
export const putComment: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.comment) {
      next(new ErrorResponse(Status.BAD_REQUEST, '댓글 내용을 적어주세요'));
    } else if (!req.user) {
      next(new ErrorResponse(Status.UNAUTHORIZED, '로그인이 필요합니다.'));
    } else {
      let comment = await CommentService.addComment(
        req.user.id,
        parseInt(req.params.lesson_id, 10),
        req.body.comment,
      );
      let result: ResJSON = new ResJSON(
        '레슨에 댓글을 저장하는데 성공하였습니다.',
        comment,
      );
      res.status(Status.OK).json(result);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * 댓글 내용을 수정하는 미들웨어
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
export const updateComment: RequestHandler = async (req, res, next) => {
  try {
    let comment_id: number = parseInt(req.params.comment_id, 10);
    if (Number.isNaN(comment_id)) {
      next(new ErrorResponse(Status.BAD_REQUEST, '댓글 ID엔 숫자만 올 수 있습니다.'));
    } else if (!req.body.comment) {
      next(new ErrorResponse(Status.BAD_REQUEST, '댓글 내용을 적어주세요'));
    } else if (!req.user) {
      next(new ErrorResponse(Status.UNAUTHORIZED, '로그인이 필요합니다.'));
    } else {
      let updated = await CommentService.updateComment(
        comment_id,
        req.body.comment,
      );
      let result: ResJSON = new ResJSON(
        updated ? '레슨에 댓글을 업데이트하는데 성공하였습니다.' : '존재하지 않는 댓글입니다.',
        updated,
      );
      res.status(Status.OK).json(result);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * 본인의 댓글을 삭제하는 미들웨어
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
export const delComment: RequestHandler = async (req, res, next) => {
  try {
    let comment_id: number = parseInt(req.params.comment_id, 10);
    if (Number.isNaN(comment_id)) {
      next(new ErrorResponse(Status.BAD_REQUEST, '댓글 ID엔 숫자만 올 수 있습니다.'));
    } else if (!req.user) {
      next(new ErrorResponse(Status.UNAUTHORIZED, '로그인이 필요합니다.'));
    } else {
      const del: boolean = await CommentService.removeComment(
        req.user.id,
        comment_id,
      );
      let result: ResJSON = new ResJSON(
        del ? '댓글을 삭제하는데 성공하였습니다.' : '이미 삭제되었거나 권한이 없습니다.',
        del,
      );
      res.status(Status.OK).json(result);
    }
  } catch (err) {
    next(err);
  }
};
