import { ILessonTable } from '../../types/lessonData';
import client from './client';

export const postLesson = async (id: number, body: ILessonTable) => {
  return await client.post(`/lesson?tutor_id=${id}`, body);
};
export const getLesson = (id: number) => client.get(`/lesson/${id}`);
export const getLessonByUserId = (id: number, limit: number, offset: number) =>
  client.get(`/lesson/user/${id}?limit=${limit}&offset=${offset}`);
export const getLessons = (limit: number, offset: number) =>
  client.get(`/lesson/?limit=${limit}&offset=${offset}`);
export const getLessonsByCategoryId = (category: number, limit: number, offset: number) =>
  client.get(`/lesson/lesson/${category}?limit=${limit}&offset=${offset}`);
export const editLessonById = async (id: number, body: ILessonTable) => {
  return await client.patch(`/lesson/${id}`, body);
};
export const deleteLessonById = (id: number) => client.delete(`/lesson/${id}`);
export const updateLessonOrder = async (id: number) => await client.patch(`/lesson/update/${id}`);

export const getLessonsAll = (limit: number, offset: number) =>
  client.get(`/lesson/all/dummy?limit=${limit}&offset=${offset}`);