import { User } from '../models/user';

export const createAccount = async (userInfo: User) => {
  const data = await userInfo.save();
  return data;
};
