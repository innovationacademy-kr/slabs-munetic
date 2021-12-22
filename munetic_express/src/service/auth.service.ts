import { User, userAttributes } from '../models/user.model';
import { userToAttributes } from './user.service';

export const createUser = async (
  userInfo: userAttributes,
): Promise<userAttributes> => {
  const createdUser = new User({ ...userInfo });
  createdUser.save();
  return userToAttributes(createdUser);
};
