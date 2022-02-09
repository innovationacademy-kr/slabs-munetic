/**
 * 프로퍼티로 전달되는 댓글 배열의 원소 타입을 지정합니다.
 * 
 * @author joohongpark
 */
export interface CommentDataType {
  commentListId: number;
  nickname: string;
  text: string;
  date: string;
  stars: number;
  accessible: boolean;
  modified: boolean;
}

/**
 * 프로퍼티로 받아야 하는 댓글 배열의 타입을 지정합니다.
 * 
 * @author joohongpark
 */
export interface CommentPropsType {
  comments_arr: ReadonlyArray<CommentDataType>;
}