import { Router } from 'express';
import * as CategoryAPI from '../controllers/category.controller';

export const path = '/category';
export const router = Router();

router.get('/', CategoryAPI.getAllCategory);
