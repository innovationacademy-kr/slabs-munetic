import * as Status from 'http-status';
import { ServiceResponse } from './../../modules/serviceResponse';
import errorHandler from '../../modules/errorHandler';
import * as httpMocks from 'node-mocks-http';
import errResponse from '../dummy/errResponse.json';

describe('module : errorHandler unit test', () => {
  let req: any, res: any, next: any;
  const err = new Error('error');
  const serviceErr = new ServiceResponse(
    Status.BAD_REQUEST,
    '잘못된 요청입니다.',
  );
  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });

  it('err가 ServiceResponse 인스턴스가 아니면 새로운 ServiceResponse 객체를 생성해 응답한다.', async () => {
    await errorHandler(err, req, res, next);
    expect(res.statusCode).toBe(Status.INTERNAL_SERVER_ERROR);
    expect(res._getJSONData()).toStrictEqual(errResponse);
  });
  it('err가 ServiceResponse 인스턴스이면 인스턴스 정보를 사용해 응답한다.', async () => {
    await errorHandler(serviceErr, req, res, next);
    expect(res.statusCode).toBe(Status.BAD_REQUEST);
    expect(res._getJSONData()).toStrictEqual(serviceErr.resData);
  });
});
