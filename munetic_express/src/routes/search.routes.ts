import { Router } from 'express';
import * as SearchAPI from '../controllers/search.controller';

export const path = '/search';
export const router = Router();

router.get('/', SearchAPI.getLessonsAll);
router.get('/instrument/:category_name', SearchAPI.getLessonsByCategory);
router.get('/title/:title_name', SearchAPI.getLessonsByTitle);
router.get('/tutor/:tutor_name', SearchAPI.getLessonsByTutor);
