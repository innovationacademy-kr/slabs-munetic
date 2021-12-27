import { User } from '../models/user';

export interface IsearchUser {
  login_id?: string;
  nickname?: string;
  name?: string;
  email?: string;
}

export const search = async (userInfo: IsearchUser) => {
  const data = await User.findAll({
    where: {
      ...userInfo,
      deletedAt: null,
    },
    attributes: { exclude: ['password'] },
  });
  console.log(data);
  return data;
};
