import { Router } from 'express';
export const router = Router();

import * as auth from './auth.routes';
import * as user from './user.routes';
import * as lesson from './lesson.routes';
import * as category from './category.routes';
import * as admin from './admin/admin.routes';
import * as bookmark from './bookmark.routes';
import * as comment from './comment.routes';

import passport from 'passport';
import AdminStrategy from '../modules/admin.strategy';
import {
  JwtAdminAccessStrategy,
  JwtAdminRefreshStrategy,
} from '../modules/jwt.admin.strategy';

import LocalStrategy from '../modules/local.strategy';
import {
  JwtAccessStrategy,
  JwtRefreshStrategy,
} from '../modules/jwt.local.strategy';

passport.use('local', LocalStrategy());
passport.use('jwt', JwtAccessStrategy());
passport.use('jwtRefresh', JwtRefreshStrategy());

passport.use('admin', AdminStrategy());
passport.use('jwt-admin', JwtAdminAccessStrategy());
passport.use('jwtRefresh-admin', JwtAdminRefreshStrategy());

router.use(auth.path, auth.router);
router.use(user.path, user.router);
router.use(lesson.path, lesson.router);
router.use(admin.path, admin.router);
router.use(category.path, category.router);
router.use(bookmark.path, bookmark.router);
router.use(comment.path, comment.router);
