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
  .post('/', postLesson) // createLesson
  .get('/:id', getLesson) // findLesson, findLessons(query string)
  .patch('/:id', patchLesson) // editLesson
  .delete('/:id', deleteLesson); // removeLesson
