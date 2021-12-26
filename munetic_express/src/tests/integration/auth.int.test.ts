import app from '../../app';
import request from 'supertest';
import httpStatus from 'http-status';
import { sequelize } from './../../models';
import userInfo from '../dummy/userInfo.json';

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
