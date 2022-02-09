import { useState } from 'react';
import styled from 'styled-components';
import { Rating } from '@mui/material';
import palette from '../../style/palette';
import { CommentDataType, OneCommentPropsType, CommentPropsType } from '../../types/commentData';
import CommentWrite from './CommentWrite';

/**
 * 댓글이 없을 경우 렌더링되는 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
const EmptyComments = styled.div`
  margin: 10px 0;
  padding: 25px 15px;
  color: ${palette.darkBlue};
`;

/**
 * 댓글의 최상위 요소 (ul 태그) 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
const UnorderListComments = styled.ul`
  padding: 15px 3px;
  font-size: 17px;
  font-weight: bold;
  color: ${palette.darkBlue};
  border-bottom: 1px solid ${palette.darkBlue};
`;

/**
 * 댓글 하나의 요소 (li 태그) 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
const ListComment = styled.li`
  border-top: 1px solid ${palette.lightBlue};
  padding: 5px 12px;
  position: relative;
  /*background-color: ${palette.ivory};*/
`;

/**
 * 댓글의 닉네임 (span 태그) 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
const Nickname = styled.span`
  font-size: 14px;
  line-height: 1.5;
  color: #000;
  display: inline-block;
`;

/**
 * 댓글의 내용 (p 태그) 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
const Text = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #000;
  word-break: break-all;
  word-wrap: break-word;
  margin-top: 2px;
`;

/**
 * 댓글의 날짜 (span 태그) 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
const Date = styled.span`
  display: block;
  font-size: 12px;
  line-height: 1.5;
  color: #999;
`;

/**
 * 댓글의 수정 여부를 나타내는 (span 태그) 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
const Modified = styled.span`
  padding: 5px 12px;
  font-size: 9px;
  font-style: italic;
  color: ${palette.darkBlue};
`;

/**
 * 댓글의 수정 및 삭제 버튼을 감싸는 (div 태그) 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
const Buttons = styled.div`
  position: absolute;
  top: 3px;
  right: 8px;
`;

/**
 * 댓글의 별 개수를 감싸는 (div 태그) 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
const Stars = styled.div`
  position: absolute;
  bottom: 3px;
  right: 8px;
  font-size: 12px;
`;

/**
 * 하나의 댓글을 구성하는 컴포넌트입니다. 리스트로 구성되므로 key를 설정합니다.
 * 
 * @param props.comment CommentDataType 하나의 댓글에 들어갈 정보 객체
 * @param props.edit 삭제 버튼을 누를 때 실행되는 콜백함수
 * @param props.del 삭제 버튼을 누를 때 실행되는 콜백함수
 * @returns 리액트 앨리먼트
 */
function OneComment({comment, edit, del} : OneCommentPropsType) {
  const [editable, setEditable] = useState<boolean>(true);

  const commentDel = async () => {
    del(comment.commentListId);
  }

  const commentMod = async (newStars: number | null, newComment: string) => {
    const star: number = (newStars === null) ? 1 : newStars;
    if (newStars !== comment.stars || newComment !== comment.text) {
      edit(comment.commentListId, star, newComment);
    }
    setEditable(!editable);
  }

  return (
    <ListComment key={comment.commentListId}>
      <Nickname>
        {comment.nickname}
        {comment.modified && <Modified>(댓글 수정됨)</Modified>}
      </Nickname>
      {
        editable ?
        (
          <>
          <Text>{comment.text}</Text>
          <Date>{comment.date}</Date>
          {
            comment.accessible && 
              <Buttons>
                <button onClick={() => setEditable(!editable)}>수정</button>
                <button onClick={commentDel}>삭제</button>
              </Buttons>
          }
          <Stars>
            <Rating
              size="small"
              value={comment.stars}
              readOnly />
          </Stars>
          </>
        ) : (
          <>
            <Buttons>
              <button onClick={() => setEditable(!editable)}>취소</button>
            </Buttons>
            <CommentWrite initStars={comment.stars} initComment={comment.text} submit={commentMod} />
          </>
        )
      }
    </ListComment>
  );
}

/**
 * 댓글 컴포넌트입니다. 프로퍼티로 댓글의 배열을 넣어야 합니다. 댓글이 없을 경우 빈 배열을 넣어야 합니다.
 * 
 * @param props.comments_arr 댓글 배열
 * @param props.edit 삭제 버튼을 누를 때 실행되는 콜백함수
 * @param props.del 삭제 버튼을 누를 때 실행되는 콜백함수
 * @returns 리액트 앨리먼트
 */
export default function Comment({comments_arr, edit, del} : CommentPropsType) {
  const comments = comments_arr.map((comment: CommentDataType) => 
    <OneComment comment={comment} edit={edit} del={del} />
  );

  return (comments.length ? 
    (
      <UnorderListComments>{comments}</UnorderListComments>
    ) : (
      <EmptyComments>등록된 댓글이 없습니다.</EmptyComments>
    )
  );
}
