import { sequelize } from './../../models';
import userInfo from '../dummy/userInfo.json';
import request from 'supertest';
import app from '../../app';
import httpStatus from 'http-status';

// const userInfo = {
//   login_id: 'pca0046',
//   login_password: '1234',
//   type: 'student',
//   birth: Date.now(),
//   name: '박채인',
//   nickname: 'chaepark',
//   email: 'pca0046@gmail.com',
// };

beforeEach(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (e) {
    console.log(e);
  }
});
describe('로그인 및 회원가입 api/auth/', () => {
  it('POST + /signup, 회원가입이 완료되면 회원정보가 반환된다.', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({ ...userInfo });
    expect(response.statusCode).toBe(httpStatus.CREATED);
    expect(response.body.data.login_id).toEqual(userInfo.login_id);
  });
});
