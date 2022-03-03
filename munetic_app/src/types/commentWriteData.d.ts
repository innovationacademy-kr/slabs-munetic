/**
 * 댓글 작성 컴포넌트의 프로퍼티를 정의합니다.
 * 댓글 작성 버튼을 누를 때 호출되는 콜백함수, 초기 별 개수, 초기 댓글 데이터를 받습니다.
 * 
 * @author joohongpark
 */
export interface CommentWritePropsType {
  submit: (stars: number | null, comment: string) => void;
  initStars: number | null;
  initComment: string;
}
