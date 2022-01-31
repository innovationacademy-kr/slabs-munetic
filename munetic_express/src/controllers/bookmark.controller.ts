import { RequestHandler } from 'express';
import * as Status from 'http-status';
import ErrorResponse from '../modules/errorResponse';
import { ResJSON } from '../modules/types';
import * as BookmarkService from '../service/bookmark.service';
import { Bookmark } from '../models/bookmark';

/**
 * 유저에 대한 모든 북마크를 읽어오는 미들웨어
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
export const getBookmarks: RequestHandler = async (req, res, next) => {
  try {
    if (req.user) {
      let result: ResJSON;
      let bookmarks = await BookmarkService.searchAllBookmarks(req.user.id);
      result = new ResJSON(
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
      let result: ResJSON;
      let bookmarks = await BookmarkService.searchBookmark(
        req.user.id,
        parseInt(req.params.lesson_id, 10),
      );
      result = new ResJSON(
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
 * 유저에 대한 특정 북마크를 레슨 파라미터(lesson_id)를 통해 읽어오는 미들웨어
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
export const putBookmark: RequestHandler = async (req, res, next) => {
  try {
    if (req.user) {
      let result: ResJSON;
      let newBokmark = await BookmarkService.createBookmark(
        req.user.id,
        parseInt(req.params.lesson_id, 10),
      );
      result = new ResJSON(
        '북마크 데이터를 저장하는데 성공하였습니다.',
        newBokmark,
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
 * 유저에 대한 특정 북마크를 레슨 파라미터(lesson_id)를 통해 삭제하는 미들웨어
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
export const delBookmark: RequestHandler = async (req, res, next) => {
  try {
      if (req.user) {
        const del: boolean = await BookmarkService.removeBookmark(
          req.user.id,
          parseInt(req.params.lesson_id, 10),
        );
        let result: ResJSON = new ResJSON(
          del ? '북마크 데이터를 삭제하는데 성공하였습니다.' : '이미 삭제했거나 추가한 이력이 없는 북마크입니다.',
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