import { Router } from 'express';
export const router = Router();

import * as auth from './auth.routes';
import * as user from './user.routes';
import * as lesson from './lesson.routes';
import * as admin from './admin.routes';

router.use(auth.path, auth.router);
router.use(user.path, user.router);
router.use(lesson.path, lesson.router);
router.use(admin.path, admin.router);
