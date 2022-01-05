import { Router } from 'express';
import passport from 'passport';
import * as UserApi from '../../controllers/admin/user.controller';

export const path = '/user';
export const router = Router();

router.get('/check', passport.authenticate('jwt-admin'), UserApi.doubleCheck);
