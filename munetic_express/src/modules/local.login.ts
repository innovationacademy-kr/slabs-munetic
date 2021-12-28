import passport from 'passport';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import passportLocal from 'passport-local';

const LocalStrategy = passportLocal.Strategy;

function verifyPassword(password: string, encryptedPassword: string): boolean {
  return bcrypt.compareSync(password, encryptedPassword);
}

passport.use(
  new LocalStrategy(async (login_id, login_password, done) => {
    const user = await User.findOne({ where: { login_id, deletedAt: null } });
    if (!user)
      done(null, false, { message: '입력하신 id에 해당하는 계정이 없습니다.' });

    const encryptedPassword = (await user?.toJSON().login_password) as string;
    if (!(await verifyPassword(login_password, encryptedPassword)))
      return done(null, false, { message: '잘못된 비밀번호 입니다.' });

    return done(null, user);
  }),
);
