/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 유저 로그인, 회원 가입
 */
import { Router } from 'express';
import * as Auth from '../controllers/auth.controller';

export const path = '/auth';
export const router = Router();

/**
 * @swagger
 *   /api/login:
 *    post:
 *     summary: Login User
 *     produces:
 *      - application/json
 *     parameters:
 *      - id
 *      - password
 *     resoponses:
 *       200:
 *        description: SUCCESS
 */

router.post('/login', Auth.login);
router.post('/signin', Auth.signin);
