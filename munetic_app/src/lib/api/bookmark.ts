import client from './client';

export const getLessonBookmarks = () => client.get(`/bookmark`);
export const getLessonBookmark = (lesson_id: number) => client.get(`/bookmark/${lesson_id}`);
export const putLessonBookmark = (lesson_id: number) => client.put(`/bookmark/${lesson_id}`);
export const delLessonBookmark = (lesson_id: number) => client.delete(`/bookmark/${lesson_id}`);
