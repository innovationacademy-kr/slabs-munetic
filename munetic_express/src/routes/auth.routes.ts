import { Router } from 'express';
import passport from 'passport';
import LocalStrategy from '../modules/local.strategy';
import * as Auth from '../controllers/auth.controller';
import JwtStrategy from '../modules/jwt.strategy';

export const path = '/auth';
export const router = Router();

passport.use(LocalStrategy());
passport.use('jwt', JwtStrategy());

router.post('/login', Auth.login);
router.get('/logout', Auth.logout);
router.post('/signup', Auth.signup);
router.get('/refresh', Auth.refresh);
router.get('/signup/user', Auth.isValidInfo);
