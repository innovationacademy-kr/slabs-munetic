import { User, ACCOUNT } from '../../../models/user';

export const userInfo = new User({
  login_id: 'pca0046',
  login_password: '1234',
  type: ACCOUNT['student'],
  birth: Date.now(),
  name: '박채인',
  nickname: 'chaepark',
  email: 'pca0046@gmail.com',
});
