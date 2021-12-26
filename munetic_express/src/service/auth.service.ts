import { User } from '../models/user';
import { ServiceResponse } from '../modules/serviceResponse';
import * as Status from 'http-status';

export const checkIdExist = async (loginId: string) => {
  const idExists = await User.findOne({
    where: { login_id: loginId },
  });
  if (idExists)
    throw new ServiceResponse(
      Status.BAD_REQUEST,
      '이미 존재하는 아이디입니다.',
    );
  return new ServiceResponse(Status.OK, idExists);
};

export const createUser = async (userInfo: User) => {
  const data = await userInfo.save().then(result => result.toJSON());
  return new ServiceResponse(Status.CREATED, data);
};
