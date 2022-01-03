import { Router } from 'express';
import * as Auth from '../../controllers/admin/auth.controller';
import passport from 'passport';

export const path = '/auth';
export const router = Router();

router.post('/signup', Auth.signup);
router.post('/login', Auth.login);
router.get('/logout', passport.authenticate('jwt-admin'), Auth.logout);
router.get('/refresh', passport.authenticate('jwtRe-admin'), Auth.refresh);
