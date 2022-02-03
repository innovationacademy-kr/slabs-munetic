import { Router } from 'express';
import * as Auth from '../../controllers/admin/auth.controller';
import { jwtAdminAuth, jwtReAdminAuth } from '../../modules/jwt.admin.strategy';

export const path = '/auth';
export const router = Router();

router.post('/signup', jwtAdminAuth(), Auth.signup);
router.post('/login', Auth.login);
router.get('/logout', jwtAdminAuth(), Auth.logout);
router.get('/refresh', jwtReAdminAuth(), Auth.refresh);
router.patch('/password', jwtAdminAuth(), Auth.updatePassword);
