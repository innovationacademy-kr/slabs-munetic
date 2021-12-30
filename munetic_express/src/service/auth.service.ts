import { User } from '../models/user.model';

export const createAccount = async (userInfo: User) => {
  const data = await userInfo.save();
  return data;
};
