import { Router } from 'express';
import passport from 'passport';
import * as UserAPI from '../controllers/user.controller';

export const path = '/user';
export const router = Router();

router.get('/', passport.authenticate('jwt'), UserAPI.getMyProfile);
router.patch('/', passport.authenticate('jwt'), UserAPI.editUserProfile);
router.get('/all', /*passport.authenticate('jwt'),*/ UserAPI.getAllUserProfile);
router.get('/:id', UserAPI.getUserProfile);
