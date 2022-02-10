import { Router } from 'express';
import * as SearchAPI from '../controllers/search.controller';

export const path = '/search';
export const router = Router();

router.get('/', SearchAPI.getLessonsAll);
router.get('/instrument/:category_name', SearchAPI.getLessonsByCategory);
router.get('/title', SearchAPI.getLessonsByTitle);
router.get('/tutor', SearchAPI.getLessonsByTutor);
