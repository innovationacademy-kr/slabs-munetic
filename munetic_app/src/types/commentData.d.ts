/**
 * 프로퍼티로 전달되는 댓글 배열의 원소 타입을 지정합니다.
 *
 * @author joohongpark
 */
export interface CommentDataType {
  commentListId: number;
  nickname: string;
  user_id: number;
  text: string;
  date: string;
  stars: number;
  accessible: boolean;
  modified: boolean;
}

/**
 * 하나의 댓글을 구성하는 컴포넌트의 프로퍼티를 지정합니다.
 *
 * @author joohongpark
 */
export interface OneCommentPropsType {
  comment: CommentDataType;
  edit: (commentId: number, stars: number, comment: string) => void;
  del: (commentId: number) => void;
}

/**
 * 프로퍼티로 받아야 하는 댓글 배열의 타입을 지정합니다.
 *
 * @author joohongpark
 */
export interface CommentPropsType {
  comments_arr: ReadonlyArray<CommentDataType>;
  edit: (commentId: number, stars: number, comment: string) => void;
  del: (commentId: number) => void;
}

/**
 * 댓글 테이블의 데이터 타입을 정의합니다.
 *
 * @author sungkim
 */
export interface ICommentTable {
  id: number;
  user_id: number;
  lesson_id: number;
  content: string;
  stars: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

/**
 * 댓글 많은 강사의 타입을 지정합니다.
 *
 * @author joohongpark
 */
export interface ICommentPerTutorTable {
  tutor_id: number;
  comment_count: number;
}
