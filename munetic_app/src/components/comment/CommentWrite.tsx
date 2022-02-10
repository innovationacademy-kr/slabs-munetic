import { useState } from 'react';
import styled from 'styled-components';
import { Rating } from '@mui/material';
import palette from '../../style/palette';
import { CommentWritePropsType } from '../../types/commentWriteData';

/**
 * 댓글 작성의 요소를 구분하는 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
const ContentBox = styled.div`
  border-bottom: 1px solid ${palette.darkBlue};
  display: flex;
  align-items: center;
  padding: 12px 12px;
`;

/**
 * 텍스트 라벨 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
const Label = styled.span`
  white-space: nowrap;
  padding: 10px 25px;
  font-size: 16px;
  line-height: 1.5;
  display: inline-block;
`;

/**
 * 별점을 감싸는 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
const StarPackage = styled.span`
  padding: 5px 25px;
  display: inline-block;
`;

/**
 * 댓글 작성 텍스트 공간 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
const TextBox = styled.textarea`
  border-bottom: 1px solid ${palette.darkBlue};
  width: 100%;
  height: 146px;
  padding: 10px 10px;
  margin-bottom: 20px;
  outline: none;
  resize: none;
`;

/**
 * 댓글 작성 버튼 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
const AddButton = styled.button`
  margin-left: auto;
  width: 85px;
  height: 31px;
  line-height: 29px;
  border-width: 1px;
  border-style: solid;
  border-radius: 2px;
  font-size: 14px;
  font-weight: bold;
  background: ${palette.grayBlue};
  border-color: ${palette.darkBlue};
  text-shadow: 0px -1px ${palette.darkBlue};
  color: #fff;
  cursor: pointer;
`;

/**
 * 댓글 작성 컴포넌트입니다.
 * 
 * @param props.submit 댓글 작성 버튼을 누를 때 호출되는 콜백함수
 * @param props.initStars 댓글 작성할 때 별 초기값
 * @param props.del 댓글 작성할 때 댓글 내용 초기값
 * @returns 리액트 앨리먼트
 * @author joohongpark
 */
export default function CommentWrite({submit, initStars, initComment}: CommentWritePropsType) {
  const [stars, setStars] = useState<number | null>(initStars);
  const [comment, setComment] = useState<string>(initComment);

  function callback() {
    const cp_stars = stars;
    const cp_comment = comment;
    submit(cp_stars, cp_comment);
    setStars(initStars);
    setComment(initComment);
  }

  return (
    <>
    <ContentBox>
      <Label>평점</Label>
      <StarPackage>
        <Rating
          size="large"
          value={stars}
          onChange={(event, newValue) => {
            setStars(newValue);
          }}
        />
      </StarPackage>
    </ContentBox>
    <ContentBox>
      <Label>댓글</Label>
      <TextBox
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
    </ContentBox>
    <ContentBox>
      <AddButton onClick={callback}>등록</AddButton>
    </ContentBox>
  </>
  );
}