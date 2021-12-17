import { User, userCreationAttributes } from '../models/user';

export const createUser = async (
  userInfo: userCreationAttributes,
): Promise<userCreationAttributes> => {
  const user = new User({ ...userInfo });
  user.save();
  return user;
};
