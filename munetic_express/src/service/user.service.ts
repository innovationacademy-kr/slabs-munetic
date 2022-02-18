import { Op } from 'sequelize';
import { Account, User } from '../models/user';
import * as Status from 'http-status';
import ErrorResponse from '../modules/errorResponse';
import * as TutorInfoMapper from '../mapping/TutorInfoMapper';
import { TutorInfo } from '../models/tutorInfo'
import { ITutorInfoInsertType, ITutorInfoType } from '../types/controller/tutorInfoData';

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
  login_password?: string | null;
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

export const findAllUserById = async (id: number) => {
  const user = await User.findOne({
    where: { id: id },
    attributes: { exclude: ['login_password'] },
    paranoid: false,
  });
  if (user === null) {
    throw new ErrorResponse(
      Status.BAD_REQUEST,
      '유효하지 않은 유저 아이디입니다.',
    );
  }
  return user;
};

export const findTutorIdByName = async (tutor_name: string) => {
  const data = await User.findOne({
      where: {
          name: tutor_name
      },
      attributes: ['id']
  })
  if (data === null) return {id: 0};
  return data;
}

/**
 * 튜터 타입 변경
 * 
 * @param user_id user ID
 * @param type Account user 타입
 * @returns Promise<boolean>
 * @author joohongpark
 */
export const userTypeChange = async (
  user_id: number,
  type: Account,
): Promise< boolean > => {
  const [userUpdate] = await User.update( {
    type: type,
  } , {
    where: {
      id: user_id,
    },
  });
  return (userUpdate === 0);
}

/**
 * 튜터의 추가 데이터를 새로 추가하거나 업데이트
 * 
 * @param user_id user ID
 * @param tutor_info ITutorInfoType
 * @returns Promise<boolean>
 * @throws ErrorResponse if the user ID or lesson ID is not exists.
 * @author joohongpark
 */
export const addTutorDataById = async (
  user_id: number,
  tutor_info: ITutorInfoType,
): Promise< boolean > => {
  let rtn: boolean = false;
  const data: ITutorInfoInsertType = TutorInfoMapper.toTutorInfoEntity(user_id, tutor_info);
  try {
    const newTutorData: [TutorInfo, boolean] = await TutorInfo.findOrCreate({
      where: { user_id },
      defaults: data,
    });
    const check = await newTutorData[0].update({ ...tutor_info });
    rtn = check !== null;
  } catch (e) {
    throw new ErrorResponse(Status.BAD_REQUEST, '유효하지 않은 강의 id입니다.');
  }
  return rtn;
}