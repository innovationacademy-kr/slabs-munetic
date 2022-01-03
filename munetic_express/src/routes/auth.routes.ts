import { Router } from 'express';
import * as Auth from '../controllers/auth.controller';
import passport from 'passport';

export const path = '/auth';
export const router = Router();

router.post('/login', Auth.login);
router.get('/logout', passport.authenticate('jwt'), Auth.logout);
router.post('/signup', Auth.signup);
router.get('/refresh', passport.authenticate('jwtRe'), Auth.refresh);
router.get('/signup/user', Auth.isValidInfo);
