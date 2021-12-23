import { User } from '../models/user';

export const createUser = async (userInfo: User) => {
  try {
    await userInfo.save();
    return userInfo;
  } catch (err) {
    return null;
  }
};
