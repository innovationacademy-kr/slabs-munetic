import client from './client';

export const getStarTutors = () => client.get(`/like/startutor`);
export const getLessonLikes = () => client.get(`/like`);
export const getLessonLike = (lesson_id: number) => client.get(`/like/${lesson_id}`);
export const getLikedPeoples = (lesson_id: number) => client.get(`/like/${lesson_id}/all`);
export const putLessonLike = (lesson_id: number) => client.put(`/like/${lesson_id}`);
export const delLessonLike = (lesson_id: number) => client.delete(`/like/${lesson_id}`);
