import { Router } from 'express';
import * as lesson from '../../controllers/admin/lesson.controller';
import passport from 'passport';
import { jwtAdminAuth } from '../../modules/jwt.admin.strategy';

export const path = '/lesson';
export const router = Router();

router.get('/', jwtAdminAuth(), lesson.getAllLessons);
router.get('/:id', jwtAdminAuth(), lesson.getLessonById);
router.delete('/:id', jwtAdminAuth(), lesson.deleteLesson);
router.get('/user/:id', jwtAdminAuth(), lesson.getUserLessons);
