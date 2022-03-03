import { Router } from 'express';
import * as Auth from '../controllers/auth.controller';
import passport from 'passport';
import { jwtAuth, jwtReAuth } from '../modules/jwt.local.strategy';

export const path = '/auth';
export const router = Router();

router.post('/login', Auth.login);
router.get('/logout', jwtAuth(), Auth.logout);
router.post('/signup', Auth.signup);
router.post('/tutorsignup', jwtAuth(), Auth.tutorsignup);
router.get('/refresh', jwtReAuth(), Auth.refresh);
router.get('/signup/user', Auth.isValidInfo);
router.put('/changeaccount', jwtAuth(), Auth.changeAccount);
router.get('/logincheck', jwtAuth(), Auth.loginCheck);
