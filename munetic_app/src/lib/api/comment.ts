import client from './client';

export const getCommentByLesson = async (lesson_id: number) => {
  return await client.get(`/comment/lesson/${lesson_id}`)
}
