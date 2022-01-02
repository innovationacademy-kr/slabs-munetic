import axios from 'axios';

const instance = axios.create({ baseURL: 'http://localhost:3030/api/' });

/**
 * API 예시
 */

export const getAllUserList = async (page: number) => {
  return await instance.get(`user?page=${page + 1}`);
};
