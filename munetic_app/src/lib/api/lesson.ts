import { LessonWriteData } from '../../types/lessonData';
import client from './client';

export const postLesson = (id: number, body: LessonWriteData) => {
  client.post(`/api/lesson?tutor_id=${id}`, body);
};
export const getLesson = (id: number) => client.get(`/api/lesson/${id}`);
export const getLessonByUserId = (id: number, limit: number, offset: number) =>
  client.get(`/api/lesson/user/${id}?limit=${limit}&offset=${offset}`);
export const getLessons = (limit: number, offset: number) =>
  client.get(`/api/lesson/?limit=${limit}&offset=${offset}`);
export const editLessonById = (id: number, body: LessonWriteData) =>
  client.patch(`/api/lesson/${id}`, body);
export const deleteLessonById = (id: number) =>
  client.delete(`/api/lesson/${id}`);
