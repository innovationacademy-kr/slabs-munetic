/**
 * CommentTop 컴포넌트가 프로퍼티로 받아야 하는 타입을 지정합니다.
 * 댓글 새로고침 함수, 시간순 정렬 함수, 별 개수순 정렬 함수, 댓글 개수를 받습니다.
 * 
 * @author joohongpark
 */
 export interface FunctionPropsType {
  refrash: () => void;
  sortByTime: () => void;
  incSortByStar: () => void;
  decSortByStar: () => void;
  commentCount: number;
}
