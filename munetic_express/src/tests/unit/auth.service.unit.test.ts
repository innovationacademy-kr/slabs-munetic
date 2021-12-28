import { User } from '../../models/user';
import UserInstance from '../dummy/userInstance';
import * as AuthService from '../../service/auth.service';

jest.mock('../../models/user');
const UserInstanceSave = jest.spyOn(UserInstance, 'save');
const userFindOne = jest.spyOn(User, 'findOne');

describe('회원가입 : AuthService.createUser unit test', () => {
  it('새로운 유저 정보를 db에 저장한다', async () => {
    await AuthService.createAccount(UserInstance);
    expect(UserInstance.save).toBeCalled();
  });
  it('성공적으로 저장되면 db에 저장된 유저정보를 반환한다.', () => {
    UserInstanceSave.mockResolvedValueOnce(UserInstance);
    AuthService.createAccount(UserInstance).then(result =>
      expect(result).toStrictEqual(UserInstance),
    );
  });
});
