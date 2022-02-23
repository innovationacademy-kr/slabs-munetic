import { Router } from 'express';
import * as auth from './auth.routes';
import * as user from './user.routes';
import * as lesson from './lesson.routes';
import * as comment from './comment.routes';
import * as etc from './etc.routes';

export const path = '/admin';
export const router = Router();

router.use(auth.path, auth.router);
router.use(user.path, user.router);
router.use(lesson.path, lesson.router);
router.use(comment.path, comment.router);
router.use(etc.path, etc.router);
