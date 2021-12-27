import { userSignupData } from '../../types/userSignupData';
import client from './client';

export const signup = (userSignupData: userSignupData) =>
  client.post('/auth/signup', userSignupData);
export const login = (body: { userId: string; password: string }) =>
  client.post('/auth/login', body);
