import { Router } from 'express';
import passport from 'passport';
import LocalStrategy from '../modules/local.strategy';
import * as Auth from '../controllers/auth.controller';

export const path = '/auth';
export const router = Router();

passport.use('local', LocalStrategy());

router.post('/login', Auth.login);
router.post('/signup', Auth.signup);
router.get('/signup/user', Auth.isValidInfo);
router.get('/logout', Auth.logout);
