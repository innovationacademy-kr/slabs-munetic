import { Request } from 'express';
import { now } from 'sequelize/dist/lib/utils';
import { Account, Gender } from '../models/user';

export const userObject = (req: Request) => {
  const {
    login_id,
    login_password,
    name,
    nickname,
    birth,
    gender,
    type,
    email,
    phone_number,
  } = req.body as {
    login_id: string;
    login_password: string;
    name: string;
    nickname: string;
    birth: string;
    gender: string;
    type: string;
    email?: string;
    phone_number?: string;
  };
  const user = {
    login_id,
    login_password,
    name,
    birth: new Date(birth),
    gender:
      gender === 'Male'
        ? Gender.Male
        : gender === 'Female'
        ? Gender.Female
        : Gender.Other,
    nickname,
    type: type === 'Student' ? Account.Student : Account.Tutor,
    email,
    phone_number,
  };
  return user;
};

export const adminObject = (req: Request) => {
  const { email, name, login_password, type } = req.body as {
    email: string;
    login_password: string;
    name: string;
    type: string;
  };

  const admin = {
    login_id: email,
    login_password,
    name,
    nickname: email,
    birth: new Date(),
    gender: Gender.Other,
    type: type === 'Admin' ? Account.Admin : Account.Owner,
    email,
  };

  return admin;
};
