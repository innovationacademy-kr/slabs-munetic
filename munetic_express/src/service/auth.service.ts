import { User } from '../models/user';
import { ServiceResponse } from '../modules/serviceResponse';
import * as Status from 'http-status';

export const checkAlreadyExists = async (login_id?: string, email?: string) => {
  const result = await User.findOne({
    where: login_id ? { login_id } : { email },
    raw: true,
  });
  if (result)
    throw new ServiceResponse(
      Status.BAD_REQUEST,
      '이미 존재하는 유저 정보입니다.',
    );
  return new ServiceResponse(Status.OK, '사용할 수 있는 Id/email 입니다.');
};

export const createUser = async (userInfo: User) => {
  const data = await userInfo.save().then(result => result.toJSON());
  return new ServiceResponse(Status.CREATED, data);
};
