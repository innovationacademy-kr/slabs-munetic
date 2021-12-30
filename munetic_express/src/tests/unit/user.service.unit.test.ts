import { User } from '../../models/user.model';
import UserInstance from '../dummy/userInstance';
import * as UserService from '../../service/user.service';

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
