import { Router } from 'express';
import * as auth from './auth.routes';
import * as user from './user.routes';

export const path = '/admin';
export const router = Router();

router.use(auth.path, auth.router);
router.use(user.path, user.router);
