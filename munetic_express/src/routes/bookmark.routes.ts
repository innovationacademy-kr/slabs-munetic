import { Router } from 'express';
import * as BookmarkAPI from '../controllers/bookmark.controller';
import { jwtAuth } from '../modules/jwt.local.strategy';

export const path = '/bookmark';
export const router = Router();

router.get('/', jwtAuth(), BookmarkAPI.getBookmarks);
router.get('/:lesson_id', jwtAuth(), BookmarkAPI.getBookmark);
router.put('/:lesson_id', jwtAuth(), BookmarkAPI.putBookmark);
router.delete('/:lesson_id', jwtAuth(), BookmarkAPI.delBookmark);
