import { Request, Response } from 'express';
import * as Status from 'http-status';
import { ServiceResponse } from './serviceResponse';

export default function errorHandler(
  err: Error | ServiceResponse,
  req: Request,
  res: Response,
) {
  let error: ServiceResponse;
  if (typeof err === 'function') {
    error = new ServiceResponse(
      Status.INTERNAL_SERVER_ERROR,
      '서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    );
  } else error = err as ServiceResponse;
  res.status(error.status).json(error.resData);
}
