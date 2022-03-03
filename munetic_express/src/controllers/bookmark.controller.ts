import { RequestHandler } from 'express';
import * as Status from 'http-status';
import ErrorResponse from '../modules/errorResponse';
import { ResJSON } from '../modules/types';
import * as BookmarkService from '../service/bookmark.service';

/**
 * 유저가 북마크를 누른 강의들을 읽어오는 미들웨어
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
export const getBookmarks: RequestHandler = async (req, res, next) => {
  try {
    if (req.user) {
      let bookmarks = await BookmarkService.searchAllBookmarks(req.user.id);
      let result: ResJSON = new ResJSON(
        '북마크 데이터를 불러오는데 성공하였습니다.',
        bookmarks,
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
 * 유저가 레슨 파라미터(lesson_id)를 북마크 했는지의 여부를 읽어오는 미들웨어
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
export const getBookmark: RequestHandler = async (req, res, next) => {
  try {
    if (req.user) {
      let bookmarks = await BookmarkService.searchBookmark(
        req.user.id,
        parseInt(req.params.lesson_id, 10),
      );
      let result: ResJSON = new ResJSON(
        '북마크 존재 여부를 확인하는데 성공하였습니다.',
        bookmarks,
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
 * 북마크를 저장하는 미들웨어
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
export const putBookmark: RequestHandler = async (req, res, next) => {
  try {
    if (req.user) {
      let save: boolean = await BookmarkService.setBookmark(
        req.user.id,
        parseInt(req.params.lesson_id, 10),
        true,
      );
      let result: ResJSON = new ResJSON(
        save ? '북마크 데이터를 저장하는데 성공하였습니다.' : '북마크 데이터를 저장하는데 실패하였습니다.',
        save,
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
 * 북마크를 해제하는 미들웨어
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
export const delBookmark: RequestHandler = async (req, res, next) => {
  try {
      if (req.user) {
        const del: boolean = await BookmarkService.setBookmark(
          req.user.id,
          parseInt(req.params.lesson_id, 10),
          false,
        );
        let result: ResJSON = new ResJSON(
          del ? '북마크 데이터를 삭제하는데 성공하였습니다.' : '북마크 데이터를 삭제하는데 실패하였습니다.',
          del,
        );
        res.status(Status.OK).json(result);
      } else {
        next(new ErrorResponse(Status.UNAUTHORIZED, '로그인이 필요합니다.'));
      }
    } catch (err) {
      next(err);
    }
};