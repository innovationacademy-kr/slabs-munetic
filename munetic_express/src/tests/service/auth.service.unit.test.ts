import { userInfo } from './dummy/newUser';
import * as AuthService from '../../service/auth.service';

jest.mock('../../models/user');
const UserInfoSave = userInfo.save as jest.Mock;
describe('회원가입 : AuthService.createUser unit test', () => {
  it('새로운 유저 정보를 db에 저장한다', async () => {
    await AuthService.createUser(userInfo);
    expect(userInfo.save).toBeCalled();
  });
  it('성공적으로 저장되면 userInfo를 반환한다.', async () => {
    await AuthService.createUser(userInfo);
    expect(AuthService.createUser(userInfo)).toStrictEqual(
      Promise.resolve(userInfo),
    );
  });
  it('저장에 실패하면 null을 반환한다.', async () => {
    UserInfoSave.mockReturnValue(Promise.reject(userInfo));
    await AuthService.createUser(userInfo);
    expect(AuthService.createUser(userInfo)).toStrictEqual(
      Promise.resolve(null),
    );
  });
});
