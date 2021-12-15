import { RequestHandler } from 'express';
import status from 'http-status';
import * as authService from '../service/auth.service';

export const login: RequestHandler = (req, res) => {
  try {
  } catch {}
};

export const signin: RequestHandler = (req, res) => {
  try {
    const user = authService.createUser(req.body);
    res.status(status.CREATED).json({ message: 'SUCCESS!', data: { user } });
  } catch {}
};
