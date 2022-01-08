import { Router } from 'express';
import * as lesson from '../../controllers/admin/lesson.controller';
import passport from 'passport';

export const path = '/lesson';
export const router = Router();

router.get('/', passport.authenticate('jwt-admin'), lesson.getAllLessons);
router.get(
  '/user/:id',
  passport.authenticate('jwt-admin'),
  lesson.getUserLessons,
);
