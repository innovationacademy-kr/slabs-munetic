import { Router } from 'express';
import * as UserApi from '../../controllers/admin/user.controller';
import { jwtAdminAuth } from '../../modules/jwt.admin.strategy';

export const path = '/user';
export const router = Router();

router.get('/app', jwtAdminAuth(), UserApi.getAppUserList);
router.get('/admin', jwtAdminAuth(), UserApi.getAdminUserList);
router.get('/check', jwtAdminAuth(), UserApi.doubleCheck);
router.get('/:id', jwtAdminAuth(), UserApi.getUserInfo);
router.patch('/:id', jwtAdminAuth(), UserApi.patchUserByAdmin);
router.delete('/:id', jwtAdminAuth(), UserApi.deleteUserByAdmin);
