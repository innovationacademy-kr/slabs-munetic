import { Router } from 'express';
import * as CommentAPI from '../../controllers/comment.controller';
import * as CommentAdminAPI from '../../controllers/admin/comment.controller';
import { jwtAdminAuth } from '../../modules/jwt.admin.strategy';

export const path = '/comment';
export const router = Router();

router.get('/', jwtAdminAuth(), CommentAdminAPI.getAllComments);
router.post('/del', jwtAdminAuth(), CommentAdminAPI.delComments);