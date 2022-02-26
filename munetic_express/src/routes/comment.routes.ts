import { Router } from 'express';
import * as CommentAPI from '../controllers/comment.controller';
import { jwtAuth } from '../modules/jwt.local.strategy';

export const path = '/comment';
export const router = Router();

router.get('/startutor', CommentAPI.getAllCommentsCountPerTutor);
router.get('/user/:user_id', jwtAuth(), CommentAPI.getCommentsByUserId);
router.get('/lesson/:lesson_id', jwtAuth(), CommentAPI.getCommentsByLessonId);
router.post('/lesson/:lesson_id', jwtAuth(), CommentAPI.putComment);
router.put('/:comment_id', jwtAuth(), CommentAPI.updateComment);
router.delete('/:comment_id', jwtAuth(), CommentAPI.delComment);
