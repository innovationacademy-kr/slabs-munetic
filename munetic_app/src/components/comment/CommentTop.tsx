import styled from 'styled-components';
import palette from '../../style/palette';
import { FunctionPropsType } from '../../types/commentTopData';

/**
 * 댓글 상단 메뉴를 감싸는 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
const ContentBox = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 12px;
`;

/**
 * 댓글 상단 메뉴 내의 왼쪽 컴포넌트들을 감싸는 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
const LeftBox = styled.div`
  color: #000;
  font-size: 15px;
  line-height: 1.5;
`;

/**
 * 텍스트를 감싸는 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
const TextBox = styled.span`
  font-weight: normal;
  margin-left: 4px;
  display: inline-block;
  vertical-align: top;
`;

/**
 * 댓글 개수를 나타내는 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
const CommentCount = styled.span`
  font-weight: normal;
  color: ${palette.red};
  margin-left: 4px;
  vertical-align: top;
  display: inline-block;
`;

/**
 * 댓글 상단 메뉴 내의 오른쪽 컴포넌트들을 감싸는 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
const RightBox = styled.div`
  margin-left: auto;
  font-size: 13px;
  vertical-align: top;
`;

/**
 * 댓글의 상단바 컴포넌트입니다.
 * 
 * @param props.refrash 새로고침 함수
 * @param props.sortByTime 시간순 정렬 함수
 * @param props.sortByStar 별개수별 정렬 함수
 * @param props.commentCount 댓글 개수
 * @returns 리액트 앨리먼트 
 * @author joohongpark
 */
export default function CommentTop({refrash, sortByTime, incSortByStar, decSortByStar, commentCount}: FunctionPropsType) {
  return (
  <ContentBox>
    <LeftBox>
      <TextBox>전체 댓글</TextBox>
      <CommentCount>{commentCount}</CommentCount>
    </LeftBox>
    <RightBox>
      <TextBox><button onClick={refrash}>새로고침</button></TextBox>
      <TextBox><button onClick={sortByTime}>등록순</button></TextBox>
      <TextBox><button onClick={incSortByStar}>별점 높은순</button></TextBox>
      <TextBox><button onClick={decSortByStar}>별점 낮은순</button></TextBox>
    </RightBox>
  </ContentBox>
  );
}
