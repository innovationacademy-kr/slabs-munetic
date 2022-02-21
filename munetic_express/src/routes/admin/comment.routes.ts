import { Router } from 'express';
import * as CommentAPI from '../../controllers/comment.controller';
import { jwtAdminAuth } from '../../modules/jwt.admin.strategy';

export const path = '/comment';
export const router = Router();

router.get('/', jwtAdminAuth(), CommentAPI.getComments);