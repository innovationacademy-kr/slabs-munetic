import { Router } from 'express';
import * as SearchAPI from '../controllers/search.controller';

export const path = '/search';
export const router = Router();

router.get('/', SearchAPI.getLessonsAll);

router.get('/instrument', SearchAPI.getLessonsByInstrument);
router.get('/tutor', SearchAPI.getLessonsByTutor);
router.get('/location', SearchAPI.getLessonsByLocation);
router.get('/mix', SearchAPI.getLessonsMix);