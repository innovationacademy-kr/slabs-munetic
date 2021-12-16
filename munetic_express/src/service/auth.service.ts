import { User, ACCOUNT, userCreationAttributes } from '../models/user';

export class AuthService {
  public signin(userInfo: userCreationAttributes) {
    const user = new User({ ...userInfo });
    user.save();
    return user;
  }
}
