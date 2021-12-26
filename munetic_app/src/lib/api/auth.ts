import { userSignupData } from '../../types/userSignupData';
import client from './client';

export const signup = (userSignupData: userSignupData) =>
  client.post('/auth/signin', userSignupData);
