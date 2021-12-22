import { userAttributes } from '../models/user.model';

export const userToAttributes = ({
  id,
  type,
  login_id = undefined,
  login_password = undefined,
  nickname = undefined,
  name = undefined,
  name_public = undefined,
  gender = undefined,
  email = undefined,
  phone_number = undefined,
  phone_public = undefined,
  image_url = undefined,
  introduction = undefined,
}: userAttributes): userAttributes => {
  return {
    id,
    type,
    login_id,
    login_password,
    nickname,
    name,
    name_public,
    gender,
    email,
    phone_number,
    phone_public,
    image_url,
    introduction,
  };
};
