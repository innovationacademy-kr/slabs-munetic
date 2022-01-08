import { NextFunction } from 'express';
import { Op } from 'sequelize';
import { Account, User } from '../models/user';
import * as Status from 'http-status';
import ErrorResponse from '../modules/errorResponse';

export interface IsearchUser {
  login_id?: string;
  nickname?: string;
  name?: string;
  email?: string;
  type?: object;
}

export const createUser = async (userInfo: User) => {
  const data = await userInfo.save();
  const dataJSON = data.toJSON() as any;
  delete dataJSON.login_password;
  delete dataJSON.createdAt;
  delete dataJSON.updatedAt;
  return dataJSON;
};

export const deleteUser = async (userId: number) => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });
  if (!user)
    throw new ErrorResponse(Status.BAD_REQUEST, '유효하지 않은 유저 id입니다.');
  await user.destroy();
  return true;
};

export const searchAllUser = async (userInfo: IsearchUser) => {
  const data = await User.findAll({
    where: {
      ...userInfo,
    },
    paranoid: false,
  });
  return data;
};

export const searchActiveUser = async (userInfo: IsearchUser) => {
  const data = await User.findAll({
    where: {
      ...userInfo,
    },
  });
  return data;
};

const userProfileFindByQuery = (id: number) => {
  return {
    where: {
      id,
    },
    attributes: {
      exclude: ['login_password', 'createdAt', 'updatedAt', 'deletedAt'],
    },
  };
};

export const findAllAppUser = async (page: number) => {
  let limit = 10;
  let offset = 0;
  if (page > 1) {
    offset = (page - 1) * limit;
  }
  const users = await User.findAndCountAll({
    where: {
      type: {
        [Op.or]: ['Tutor', 'Student'],
      },
    },
    attributes: { exclude: ['login_password'] },
    offset,
    limit,
    paranoid: false,
  });
  if (users === null) {
    throw new ErrorResponse(Status.BAD_REQUEST, '유저들을 불러올 수 없습니다.');
  }
  return users;
};

export const findAllAdminUser = async (page: number) => {
  let limit = 10;
  let offset = 0;
  if (page > 1) {
    offset = (page - 1) * limit;
  }
  const users = await User.findAndCountAll({
    where: {
      type: {
        [Op.or]: ['Owner', 'Admin'],
      },
    },
    attributes: { exclude: ['login_password'] },
    offset,
    limit,
    paranoid: false,
  });
  if (users === null) {
    throw new ErrorResponse(Status.BAD_REQUEST, '유저들을 불러올 수 없습니다.');
  }
  return users;
};

export const findUserById = async (id: number) => {
  const user = await User.findOne(userProfileFindByQuery(id));
  if (user === null) {
    throw new ErrorResponse(
      Status.BAD_REQUEST,
      '유효하지 않은 유저 아이디입니다.',
    );
  }
  return user;
};

export interface NewProfileInfoType {
  type?: Account;
  nickname?: string;
  name_public?: boolean;
  phone_public?: boolean;
  image_url?: string | null;
  introduction?: string | null;
}

export const editUserById = async (
  id: number,
  newProfileInfo: NewProfileInfoType,
) => {
  const [user] = await User.update(newProfileInfo, {
    where: {
      id,
    },
  });
  if (user === 0) {
    throw new ErrorResponse(
      Status.BAD_REQUEST,
      '유효하지 않은 유저 아이디입니다.',
    );
  }
  const newUserProfile = User.findOne(userProfileFindByQuery(id));
  if (newUserProfile === null) {
    throw new ErrorResponse(
      Status.INTERNAL_SERVER_ERROR,
      '유저 프로필 업데이트를 실패하였습니다.',
    );
  }
  return newUserProfile as Promise<User>;
};
