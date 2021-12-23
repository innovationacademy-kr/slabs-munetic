import { Router } from 'express';
import * as Auth from '../controllers/auth.controller';

export const path = '/auth';
export const router = Router();

router.post('/login', Auth.login);
router.post('/signup', Auth.signup);
