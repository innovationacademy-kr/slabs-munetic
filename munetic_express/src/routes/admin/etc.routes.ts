import { Router } from 'express';
import { jwtAdminAuth } from '../../modules/jwt.admin.strategy';
import * as EtcAPI from '../../controllers/etc.controller';

export const path = '/etc';
export const router = Router();

router.get('/terms', EtcAPI.getTerms);
router.put('/terms', jwtAdminAuth(), EtcAPI.editTerms);
router.get('/license', EtcAPI.getLicense);
router.put('/license', jwtAdminAuth(), EtcAPI.editLicense);
