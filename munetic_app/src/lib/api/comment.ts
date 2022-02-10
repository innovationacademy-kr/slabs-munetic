import client from './client';

/**
 * 강의에 대한 댓글들을 받아옵니다.
 * 
 * @param lesson_id 강의 ID
 * @returns Axios response
 * @author joohongpark
 */
export const getCommentByLesson = async (lesson_id: number) => {
  return await client.get(`/comment/lesson/${lesson_id}`)
}

/**
 * 유저에 대한 댓글들을 받아옵니다.
 * 
 * @param user_id 유저 로그인 ID
 * @returns Axios response
 * @author joohongpark
 */
export const getCommentByUser = async (user_id: string) => {
  return await client.get(`/comment/user/${user_id}`)
}

/**
 * 강의에 대해 댓글을 추가합니다.
 * 
 * @param lesson_id 강의 ID
 * @param comment 댓글 내용
 * @param stars 별 개수
 * @returns Axios response
 * @author joohongpark
 */
export const addComment = async (lesson_id: number, comment: string, stars: number) => {
  const data = {
    comment,
    stars
  };
  return await client.post(`/comment/lesson/${lesson_id}`, data);
}

/**
 * 댓글을 수정합니다.
 * 
 * @param comment_id 댓글 ID
 * @param comment 댓글 내용
 * @param stars 별 개수
 * @returns Axios response
 * @author joohongpark
 */
export const modComment = async (comment_id: number, comment: string, stars: number) => {
  const data = {
    comment,
    stars
  };
  return await client.put(`/comment/${comment_id}`, data);
}

/**
 * 댓글을 삭제합니다.
 * 
 * @param comment_id 댓글 ID
 * @returns Axios response
 * @author joohongpark
 */
export const delComment = async (comment_id: number) => {
  return await client.delete(`/comment/${comment_id}`);
}
