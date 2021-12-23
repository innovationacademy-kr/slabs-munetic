import { Router } from 'express';
import {
  deleteLesson,
  getLesson,
  patchLesson,
  postLesson,
} from '../controllers/lesson.controller';

export const path = '/lesson';
export const router = Router();

router
  .post('/', postLesson)
  .get('/:id', getLesson)
  .patch('/:id', patchLesson)
  .delete('/:id', deleteLesson);
