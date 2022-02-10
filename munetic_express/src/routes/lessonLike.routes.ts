import { Router } from 'express';
import * as LessonLikeAPI from '../controllers/lessonLike.controller';
import { jwtAuth } from '../modules/jwt.local.strategy';

export const path = '/like';
export const router = Router();

router.get('/', jwtAuth(), LessonLikeAPI.getLessonLikes);
router.get('/:lesson_id', jwtAuth(), LessonLikeAPI.getLessonLike);
router.put('/:lesson_id', jwtAuth(), LessonLikeAPI.putLessonLike);
router.delete('/:lesson_id', jwtAuth(), LessonLikeAPI.delLessonLike);
router.get('/:lesson_id/all', jwtAuth(), LessonLikeAPI.getLikedPeoples);
