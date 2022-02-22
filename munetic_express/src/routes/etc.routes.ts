import { Router } from 'express';
import * as EtcAPI from '../controllers/etc.controller';

export const path = '/etc';
export const router = Router();

router.get('/terms', EtcAPI.getTerms);
router.put('/terms', EtcAPI.editTerms);
router.get('/license', EtcAPI.getLicense);
router.put('/license', EtcAPI.editLicense);
