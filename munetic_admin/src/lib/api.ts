import axios from 'axios';

const { VITE_BASE_URL } = import.meta.env;
const instance = axios.create({ baseURL: VITE_BASE_URL as string });

/**
 * API 예시
 */

export const getAllUserList = async (page: number) => {
  return await instance.get(`user/all?page=${page + 1}`);
};
