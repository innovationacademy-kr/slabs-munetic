import { User, ACCOUNT } from '../../models/user';

const UserInstance = new User({
  login_id: 'pca0046',
  login_password: '1234',
  type: ACCOUNT['student'],
  birth: new Date('1995-11-05'),
  name: '박채인',
  nickname: 'chaepark',
  email: 'pca0046@gmail.com',
});

export default UserInstance;
