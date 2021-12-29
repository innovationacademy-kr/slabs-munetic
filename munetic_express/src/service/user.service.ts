import { User } from '../models/user';

export interface IsearchUser {
  login_id?: string;
  nickname?: string;
  name?: string;
  email?: string;
}

export const createUser = async (userInfo: User) => {
  const data = await userInfo.save();
  const dataJSON = data.toJSON() as any;
  delete dataJSON.login_password;
  delete dataJSON.createdAt;
  delete dataJSON.updatedAt;
  return dataJSON;
};

export const search = async (userInfo: IsearchUser) => {
  const data = await User.findAll({
    where: {
      ...userInfo,
      deletedAt: null,
    },
    attributes: { exclude: ['password'] },
  });
  return data;
};
