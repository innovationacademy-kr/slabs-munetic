import { userSignupData } from '../../types/userSignupData';
import client from './client';

export const signup = (userSignupData: userSignupData) =>
  client.post('/auth/signup', userSignupData);
export const login = (body: { login_id: string; password: string }) =>
  client.post('/auth/login', body);
export const isValidInfo = (body: string) =>
  client.get(`/auth/signup/user?${body}`);
