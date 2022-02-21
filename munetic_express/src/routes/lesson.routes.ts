import { Router } from 'express';
import {
  deleteLesson,
  getLesson,
  getLessons,
  getUserLessons,
  patchLesson,
  postLesson,
  updateLessonOrder,
} from '../controllers/lesson.controller';

export const path = '/lesson';
export const router = Router();

router
  .post('/', postLesson) // createLesson
  .get('/', getLessons) // findLessons
  .get('/:id', getLesson) // findLesson
  .patch('/:id', patchLesson) // editLesson
  .delete('/:id', deleteLesson) // removeLesson
  .get('/user/:id', getUserLessons) // findLessonsByUserId

  .patch('/update/:id', updateLessonOrder); // updateLessonOrderByButton