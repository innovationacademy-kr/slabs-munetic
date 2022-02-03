import { Router } from 'express';
import * as UserAPI from '../controllers/user.controller';
import * as storage from '../modules/imgCreateMiddleware';
import { jwtAuth } from '../modules/jwt.local.strategy';

export const path = '/user';
export const router = Router();

router.get('/', jwtAuth(), UserAPI.getMyProfile);
router.patch('/', jwtAuth(), UserAPI.editUserProfile);
router.get('/:id', UserAPI.getUserProfile);
router.post('/image', jwtAuth(), storage.imgUpload, UserAPI.createProfileImg);
