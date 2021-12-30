import { Router } from 'express';
import {
  editUserProfile,
  getAllUserProfile,
  getUserProfile,
} from '../controllers/user.controller';

export const path = '/user';
export const router = Router();

router.get('/', getAllUserProfile);
router.get('/:id', getUserProfile);
router.patch('/:id', editUserProfile);
