import { Request } from 'express';
import { ACCOUNT } from '../models/user';

export const newUserObject = (req: Request) => {
  const { login_id, login_password, name, nickname, birth, type, email } =
    req.body as {
      login_id: string;
      login_password: string;
      name: string;
      nickname: string;
      birth: string;
      type: string;
      email: string;
    };
  const user = {
    login_id,
    login_password,
    name,
    birth: new Date(birth),
    nickname,
    email,
    type: type === 'student' ? ACCOUNT.student : ACCOUNT.tutor,
  };
  return user;
};
