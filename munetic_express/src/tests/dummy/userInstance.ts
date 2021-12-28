import { User, Account, Gender } from '../../models/user';

const UserInstance = new User({
  login_id: 'pca0046',
  login_password: '1234',
  type: Account['Student'],
  birth: new Date('1992-10-05'),
  gender: Gender['Other'],
  name: '박채인',
  nickname: 'chaepark',
  email: 'sdasdasd@gmail.com',
});

export default UserInstance;
