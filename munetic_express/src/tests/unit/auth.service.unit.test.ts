import newUser from '../dummy/newUser';
import * as AuthService from '../../service/auth.service';

jest.mock('../../models/user');
const newUserSave = newUser.save as jest.Mock;
describe('회원가입 : AuthService.createUser unit test', () => {
  it('새로운 유저 정보를 db에 저장한다', async () => {
    await AuthService.createUser(newUser);
    expect(newUser.save).toBeCalled();
  });
  it('성공적으로 저장되면 db에 저장된 유저정보를 반환한다.', async () => {
    await AuthService.createUser(newUser);
    expect(AuthService.createUser(newUser)).toStrictEqual(
      Promise.resolve(newUser),
    );
  });
  it('저장에 실패하면 null을 반환한다.', async () => {
    newUserSave.mockReturnValue(Promise.reject(newUser));
    await AuthService.createUser(newUser);
    expect(AuthService.createUser(newUser)).toStrictEqual(
      Promise.resolve(null),
    );
  });
});
