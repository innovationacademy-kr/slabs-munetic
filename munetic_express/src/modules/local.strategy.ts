import bcrypt from 'bcrypt';
import passportLocal from 'passport-local';
import * as UserService from '../service/user.service';

const Strategy = passportLocal.Strategy;

function verifyPassword(password: string, encryptedPassword: string): boolean {
  return bcrypt.compareSync(password, encryptedPassword);
}

const localStrategyCallback = async (
  login_id: string,
  login_password: string,
  done: any,
) => {
  const [user] = await UserService.search({ login_id });
  if (!user)
    return done(null, false, {
      message: '입력하신 id에 해당하는 계정이 없습니다.',
    });

  const encryptedPassword = (await user?.toJSON().login_password) as string;
  if (!(await verifyPassword(login_password, encryptedPassword)))
    return done(null, false, { message: '잘못된 비밀번호 입니다.' });

  return done(null, user.toJSON());
};

const LocalStrategy = () =>
  new Strategy(
    { usernameField: 'login_id', passwordField: 'login_password' },
    localStrategyCallback,
  );

export default LocalStrategy;
