import '@types/jest';
import * as Status from 'http-status';
import * as httpMocks from 'node-mocks-http';
import ErrorResponse from '../../modules/errorResponse';
import errorHandler from '../../modules/errorHandler';

describe('module : errorHandler unit test', () => {
  let req: any, res: any, next: any;
  const err = new Error('error');
  const errResponse = new ErrorResponse(
    Status.BAD_REQUEST,
    '잘못된 요청입니다.',
  );
  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });

  it('err가 ErrorResponse 인스턴스가 아니면 새로운 ErrorResponse 객체를 생성해 응답한다.', async () => {
    await errorHandler(err, req, res, next);
    expect(res.statusCode).toBe(Status.INTERNAL_SERVER_ERROR);
    expect(res._getJSONData()).toBe(
      '서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    );
  });
  it('err가 ErrorResponse 인스턴스이면 인스턴스 정보를 사용해 응답한다.', async () => {
    await errorHandler(errResponse, req, res, next);
    expect(res.statusCode).toBe(Status.BAD_REQUEST);
    expect(res._getJSONData()).toStrictEqual(errResponse.message);
  });
});
