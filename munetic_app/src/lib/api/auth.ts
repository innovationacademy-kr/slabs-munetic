import { userSignupData } from '../../types/userSignupData';
import client from './client';

export const signup = (userSignupData: userSignupData) =>
  client.post('/auth/signin', userSignupData);
export const isValidInfo = (body: string) =>
  client.get(`/auth/signup/user?${body}`);
