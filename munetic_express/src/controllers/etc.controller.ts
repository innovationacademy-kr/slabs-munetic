import { RequestHandler } from 'express';
import * as Status from 'http-status';
import ErrorResponse from '../modules/errorResponse';
import { ResJSON } from '../modules/types';
import * as EtcService from '../service/etc.service';

/**
 * 이용 약관을 불러오는 미들웨어
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
export const getTerms: RequestHandler = async (req, res, next) => {
  try {
    let data = await EtcService.getTerms();
    let result: ResJSON = new ResJSON(
      '이용 약관을 불러오는데 성공하였습니다.',
      data,
    );
    res.status(Status.OK).json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * 오픈소스 라이센스를 불러오는 미들웨어
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
export const getLicense: RequestHandler = async (req, res, next) => {
  try {
    let data = await EtcService.getLicense();
    let result: ResJSON = new ResJSON(
      '라이센스를 불러오는데 성공하였습니다.',
      data,
    );
    res.status(Status.OK).json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * 이용 약관을 수정하는 미들웨어
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
 export const editTerms: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body.data as string;
    if (data === undefined) {
      next(new ErrorResponse(Status.BAD_REQUEST, '잘못된 요청입니다.'));
    } else {
      const edit: boolean = await EtcService.editTerms(data);
      let result: ResJSON = new ResJSON(
        '이용약관을 수정했습니다.' ,
        edit,
      );
      res.status(Status.OK).json(result);
    }
  } catch (err) {
    next(err);
  }
};


/**
 * 오픈소스 라이센스를 수정하는 미들웨어
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author joohongpark
 */
 export const editLicense: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body.data as string;
    if (data === undefined) {
      next(new ErrorResponse(Status.BAD_REQUEST, '잘못된 요청입니다.'));
    } else {
      const edit: boolean = await EtcService.editLicense(data);
      let result: ResJSON = new ResJSON(
        '이용약관을 수정했습니다.' ,
        edit,
      );
      res.status(Status.OK).json(result);
    }
  } catch (err) {
    next(err);
  }
};

