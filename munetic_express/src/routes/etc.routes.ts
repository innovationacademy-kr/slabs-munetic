import { Router } from 'express';
import * as EtcAPI from '../controllers/etc.controller';

export const path = '/etc';
export const router = Router();

router.get('/terms', EtcAPI.getTerms);
router.get('/license', EtcAPI.getLicense);
