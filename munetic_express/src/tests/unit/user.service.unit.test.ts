import { User } from '../../models/user.model';
import UserInstance from '../dummy/userInstance';
import * as UserService from '../../service/user.service';
import { kunlee, userProfileInstance } from '../dummy/userProfileInstance';

jest.mock('../../models/user');
const userFindAll = jest.spyOn(User, 'findAll');

describe('유저 검색: UserService.search unit test', () => {
  const userInfo = {
    login_id: 'pca0046',
  };

  it('인자로 들어온 조건에 대해 findAll 함수로 조회한다.', async () => {
    await UserService.search(userInfo);
    expect(User.findAll).toBeCalled();
  });
  it('findAll 함수로 조회된 리스트를 리턴한다.', () => {
    userFindAll.mockResolvedValueOnce([UserInstance]);
    UserService.search(userInfo).then(data =>
      expect(data).toStrictEqual([UserInstance]),
    );
  });
});

const userFindAndCountAll = jest.spyOn(User, 'findAndCountAll');

describe('전체 유저 프로필 검색: UserService.findAllUser unit test', () => {
  const page = 0;
  it('전체 유저 get 요청이 들어오면 findAndCountAll 함수가 실행된다.', async () => {
    await UserService.findAllUser(page);
    expect(User.findAndCountAll).toBeCalled();
  });
  it('findAndCountAll 함수로 조회된 리스트를 리턴한다.', () => {
    const resValue = { count: [3], rows: userProfileInstance };
    userFindAndCountAll.mockResolvedValueOnce(resValue);
    UserService.findAllUser(page).then(data =>
      expect(data).toStrictEqual(resValue),
    );
  });
});

const userFindOne = jest.spyOn(User, 'findOne');

describe('유저 프로필 id로 검색: UserService.findUserById unit test', () => {
  const id = 1;

  it('유저 get 요청이 id와 함께 들어오면 findOne 함수가 실행된다.', async () => {
    await UserService.findUserById(id);
    expect(User.findOne).toBeCalled();
  });
  it('findOne 함수로 조회된 유저 정보를 리턴한다.', () => {
    userFindOne.mockResolvedValueOnce(kunlee);
    UserService.findUserById(id).then(data =>
      expect(data).toStrictEqual(kunlee),
    );
  });
});
