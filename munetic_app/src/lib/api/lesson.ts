import { LessonWriteData } from '../../types/lessonData';
import client from './client';

export const postLesson = async (id: number, body: LessonWriteData) => {
  return await client.post(`/lesson?tutor_id=${id}`, body);
};
export const getLesson = (id: number) => client.get(`/lesson/${id}`);
export const getLessonByUserId = (id: number, limit: number, offset: number) =>
  client.get(`/lesson/user/${id}?limit=${limit}&offset=${offset}`);
export const getLessons = (limit: number, offset: number) =>
  client.get(`/lesson/?limit=${limit}&offset=${offset}`);
export const editLessonById = async (id: number, body: LessonWriteData) => {
  return await client.patch(`/lesson/${id}`, body);
};
export const deleteLessonById = (id: number) => client.delete(`/lesson/${id}`);
