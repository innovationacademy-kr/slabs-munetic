import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const apiUrl = process.env.REACT_APP_API as string;

const instance = axios.create({ baseURL: apiUrl });

/**
 * API 예시
 */
export const getUserList = async () => {
  return await instance.get('/users');
};
