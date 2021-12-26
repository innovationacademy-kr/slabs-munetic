import newUser from '../dummy/newUser';
import { User } from '../../models/user';
import * as Status from 'http-status';
import * as AuthService from '../../service/auth.service';

jest.mock('../../models/user');
const newUserSave = jest.spyOn(newUser, 'save');
const userFindOne = jest.spyOn(User, 'findOne');

describe('회원가입 : AuthService.checkIdExist unit thest', () => {
  const loginId = 'pca0046';
  it('입력받은 login_id가 db에 존재하는지 확인한다.', () => {
    AuthService.checkIdExist(loginId).catch(
      () => expect(userFindOne).toBeCalled,
    );
  });
  it('이미 존재하는 id이면 에러 메세지를 담은 에러 객체를 던진다', () => {
    userFindOne.mockResolvedValue(newUser);
    AuthService.checkIdExist(loginId).catch(err => {
      expect(err.status).toBe(Status.BAD_REQUEST);
      expect(err.resData.msg).toBe('이미 존재하는 아이디입니다.');
    });
  });
  it('존재하지 않는 id이면 성공 결과를 리턴한다.', () => {
    userFindOne.mockResolvedValueOnce(null);
    return AuthService.checkIdExist(loginId).then(result => {
      expect(result.status).toBe(Status.OK);
      expect(result.resData.data).toBe(null);
    });
  });
});

describe('회원가입 : AuthService.createUser unit test', () => {
  it('새로운 유저 정보를 db에 저장한다', () => {
    AuthService.createUser(newUser).catch(() =>
      expect(newUser.save).toBeCalled(),
    );
  });
  it('성공적으로 저장되면 db에 저장된 유저정보를 반환한다.', () => {
    newUserSave.mockResolvedValueOnce(newUser);
    AuthService.createUser(newUser)
      .then(result => {
        expect(result.status).toBe(Status.CREATED);
        expect(result.resData.data).toStrictEqual(newUser);
      })
      .catch(err => {});
  });
});
