import { useEffect, useState } from 'react';
import Comment from './Comment';
import * as CommentAPI from '../../lib/api/comment';
import { CommentDataType } from '../../types/commentData';

/**
 * 서버에서 전달받은 댓글 객체를 클라이언트가 읽을 수 있는 객체로 변환하는 함수입니다.
 * 개발 중 변경 사항이 많을듯 하여 파라미터는 임시로 any 타입의 배열로 받습니다.
 * 
 * @param ReadonlyArray<any> 
 * @returns ReadonlyArray<CommentDataType>
 * @author joohongpark
 */
function convertComment(arr: ReadonlyArray<any>): ReadonlyArray<CommentDataType> {
  // FIXME: 추후에 브라우저 로컬저장소 ID에 double quote 들어가는거 제거해야 함.
  const login_id: string | undefined = localStorage.getItem('user')?.replace(/["]+/g, '');
  return (arr.map((comment: any) => 
    ({
      commentListId: comment.id,
      nickname: "글 제목 : " + comment.Lesson.title,
      text: comment.content,
      date: comment.updatedAt,
      stars: comment.stars,
      accessible: true,
      modified: false,
    })
  ));
};

/**
 * 사용자 로그인 ID를 받아 댓글 목록을 출력하는 컴포넌트입니다.
 * 
 * @param props.userId 사용자 로그인 ID
 * @returns 리액트 앨리먼트
 * @author joohongpark
 */
export default function ViewAllCommentByUser({userId} : {userId: string}) {
  const [comments, setComments] = useState<ReadonlyArray<CommentDataType>>([]);

  useEffect(() => {
    if (userId) {
      getComment();
    }
  }, [userId]);

  const delComment = async (commentId: number) => {
    try {
      await CommentAPI.delComment(commentId);
      getComment();
    } catch (e) {
      alert('댓글 삭제에 실패하였습니다.');
      console.log(e, '댓글 삭제에 실패하였습니다.');
    }
  }

  const getComment = async () => {
    try {
      const user_id: string = (userId) ? userId : "";
      const res = await CommentAPI.getCommentByUser(user_id);
      const comments_arr = convertComment(res.data.data);
      setComments(comments_arr);
    } catch (e) {
      console.log(e, 'id로 레슨을 불러오지 못했습니다.');
    }
  }

  const modComment = async (commentId:number, stars: number, comment: string) => {
    if (!comment) {
      alert('댓글 내용을 입력하세요');
      return ;
    }
    try {
      await CommentAPI.modComment(commentId, comment, stars);
      getComment();
    } catch (e) {
      alert('댓글 수정에 실패하였습니다.');
      console.log(e, '댓글 수정에 실패하였습니다.');
    }
  }

  return (
    <>
      <Comment comments_arr={comments} edit={modComment} del={delComment} />
    </>
  );
}
