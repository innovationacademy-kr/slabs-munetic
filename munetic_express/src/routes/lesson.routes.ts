import { Router } from 'express';
import {
  deleteLesson,
  getLesson,
  getLessons,
  patchLesson,
  postLesson,
} from '../controllers/lesson.controller';

export const path = '/lesson';
export const router = Router();

router
  .post('/', postLesson) // createLesson
  .get('/', getLessons) // findLessons
  .get('/:id', getLesson) // findLesson
  .patch('/:id', patchLesson) // editLesson
  .delete('/:id', deleteLesson); // removeLesson
