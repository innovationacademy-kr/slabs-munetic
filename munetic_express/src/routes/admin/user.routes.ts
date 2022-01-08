import { Router } from 'express';
import passport from 'passport';
import * as UserApi from '../../controllers/admin/user.controller';

export const path = '/user';
export const router = Router();

router.get('/app', passport.authenticate('jwt-admin'), UserApi.getAppUserList);
router.get(
  '/admin',
  passport.authenticate('jwt-admin'),
  UserApi.getAdminUserList,
);
router.get('/check', passport.authenticate('jwt-admin'), UserApi.doubleCheck);
