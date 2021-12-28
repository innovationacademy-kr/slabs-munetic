import { userSignupData } from '../../types/userSignupData';
import client from './client';

export const signup = (userSignupData: userSignupData) =>
  client.post('/api/auth/signup', userSignupData);
export const login = (body: { login_id: string; login_password: string }) =>
  client.post('/api/auth/login', body);
export const isValidInfo = (body: string) =>
  client.get(`/api/auth/signup/user?${body}`);
