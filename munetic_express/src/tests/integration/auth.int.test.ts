import app from '../../app';
import request from 'supertest';
import * as Status from 'http-status';
import { sequelize } from './../../models';
import userInfo from '../dummy/userInfo.json';

beforeAll(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (e) {
    console.log(e);
  }
});
describe('로그인 및 회원가입 api/auth/', () => {
  describe('회원가입 POST + /signup', () => {
    it('회원가입이 완료되면 회원정보가 반환된다.', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({ ...userInfo });
      expect(response.statusCode).toBe(Status.CREATED);
      expect(response.body.data.login_id).toBe(userInfo.login_id);
    });
  });

  describe('GET + /signup/user', () => {
    it('중복된 ID가 있으면 상태코드 BAD_REQUEST로 응답한다.', async () => {
      const response = await request(app)
        .get('/api/auth/signup/user')
        .query({ login_id: userInfo.login_id });
      expect(response.statusCode).toBe(Status.BAD_REQUEST);
      expect(response.body.msg).toBe('이미 존재하는 유저 정보입니다.');
    });
    it('중복된 email이 있으면 상태코드 BAD_REQUEST로 응답한다.', async () => {
      const response = await request(app)
        .get('/api/auth/signup/user')
        .query({ email: userInfo.email });
      expect(response.statusCode).toBe(Status.BAD_REQUEST);
      expect(response.body.msg).toBe('이미 존재하는 유저 정보입니다.');
    });
    it('중복된 ID가 없으면 상태코드 OK로 응답한다.', async () => {
      const response = await request(app)
        .get('/api/auth/signup/user')
        .query({ login_id: 'wi2238' });
      expect(response.statusCode).toBe(Status.OK);
      expect(response.body.msg).toBe('사용할 수 있는 Id/email 입니다.');
    });
  });
});
