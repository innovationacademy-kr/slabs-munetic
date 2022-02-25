import { User, Gender, Account } from '../user';
import * as UserService from '../../service/user.service';

function createFirstOwnerAccount() {
  const userlist = [{
    login_id: 'munetic@gmail.com',
    login_password:
      '$2b$10$9ZgatOfeQp5Di8QLo21ODuOFjrm1/zKwgOkJIPD7Yu0Ws.opQTeqK',
    name: '대표님',
    nickname: '운영자',
    birth: new Date(),
    gender: Gender.Other,
    type: Account.Owner,
    email: 'munetic@gmail.com',
  }];

  userlist.forEach(user => {
    UserService.createUser(new User({ ...user })).then(() =>
      console.log('👑 Admin:First Owner account created'),
    );
  });
}

export default function initialize() {
  createFirstOwnerAccount();
}