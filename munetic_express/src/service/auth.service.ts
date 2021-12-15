import { RequestHandler } from 'express';
import { User } from '../models/user';

export const createUser = async (userInfo: User): Promise<User | null> => {
  let user = await User.findOne({});
  return user;
};
