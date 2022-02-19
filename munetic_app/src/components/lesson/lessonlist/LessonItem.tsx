import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../../style/palette';
import Button from '../../common/Button';

/**
 * 레슨 아이템의 목록을 감싸는 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
export const LessonItemContainer = styled.div`
  background-color: ${palette.grayBlue};
  align-items: center;
  margin-bottom: 10px;
  border-radius: 3px;
  font-size: 17px;
  font-weight: 100;
  font-family: "Futura PT", "Futura", "Helvetica", "Sans serif";
`;

/**
 * 레슨 아이템을 링크로 감싸는 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
export const ClassItemDescription = styled(Link)`
  display: flex;
  align-items: center;
`;

/**
 * 레슨에 대한 사진을 표기하는 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
export const LessonItemImg = styled.img`
  position: relative;
  width: 60px;
  height: 60px;
  margin: 5px;
  border-radius: 50%;
  border: 0.12rem solid ${palette.grayBlue};
`;

/**
 * 레슨 아이템을 링크로 감싸는 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @param haveLeft boolean 컴포넌트의 왼쪽에 무엇인가 존재할 때에만 왼쪽에 줄을 그음
 * @author joohongpark
 */
export const LessonItemDescriptionContainer = styled.div<{haveLeft: boolean}>`
  position: relative;
  color: ${palette.lightgray};
  display: inline-block;
  margin: 5px 0px;
  padding: 1px 0px 1px 8px;
  ${props =>
    props.haveLeft &&
    css`border-left: 1px solid ${palette.lightgray};`
  };
  flex-grow: 1;
  width: 0;
`;

/**
 * 카테고리 라벨을 감싸는 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
export const Category = styled.div`
  padding: 2px 0px;
  font-size: 13px;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

/**
 * 타이틀 라벨을 감싸는 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
export const Title = styled.div`
  padding: 2px 0px;
  font-size: 16px;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const Name = styled.div`
  padding: 3px 0px;
  margin: 5px 0px;
  font-size: 16px;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const Location = styled.div`
  display: inline;
  padding: 2px 0px;
  margin: 0px 4px;
  font-size: 13px;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const Price = styled.div`
  display: inline;
  padding: 2px 0px;
  margin-left: 48%;
  font-size: 13px;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
// FIXME: CSS를 어떻게 조작해야하는지 몰라서 일단 마진 퍼센트로 때렸습니다..
export const CommentWithHeart = styled.div`
  display: inline;
  padding: 2px 0px;
  margin-left: 15%;
  font-size: 13px;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

/**
 * 버튼을 감싸는 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
export const Buttons = styled.div`
  width: auto;
  margin: 5px;
  align-items: center;
  float: right;
`;

/**
 * 버튼 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @param deleteBtn boolean 삭제 버튼일 때 텍스트 컬러를 붉은색으로 바꿈
 * @param to 버튼이 링크일 때 넘어가야 할 링크
 * @author kunlee
 * @version 1
 */
export const StyledButton = styled(Button)<{deleteBtn?: boolean, to?: string}>`
  background-color: ${palette.green};
  font-size: 12px;
  width: 40px;
  height: 40px;
  border-radius: 3px;
  margin-left: 5px;
  box-shadow: unset;
  border: 0.05rem solid ${palette.darkBlue};
  .buttonText {
    margin: 0;
    color: ${palette.darkBlue};
  }
  ${({ deleteBtn }) =>
    deleteBtn &&
    css`
      .buttonText {
        color: ${palette.red};
      }
    `}
`;

/**
 * LessonItem 컴포넌트의 프로퍼티 정의
 */
// FIXME: 일단은 Props에서 쓰지 않는 속성들(ex. category, title) 빼지 않았습니다. (추후 어떻게 변경될 지 몰라서)
export interface LessonItemIProps {
  lesson_id: number;                // 레슨 고유 ID
  category: string;                 // 카테고리명
  title: string;                    // 레슨 제목
  name?: string;
  location?: string;
  price?: number;
  comment_num?: number;
  lessonLike_num?: number;
  image_url?: string;               // 이미지 링크 (optional)
  editable?: boolean;               // 수정 가능 여부 (optional)
  del?: (id: number) => void;       // 삭제 콜백함수 (optional)
}

/**
 * 레슨 목록 중 하나의 요소
 * 
 * @param lesson_id 레슨 id 
 * @param category 카테고리명
 * @param title 레슨 제목
 * @returns 리액트 앨리먼트
 * @author joohongpark
 */
export function LessonItem(props: LessonItemIProps) {
  return (
    <LessonItemContainer>
      <ClassItemDescription to={`/lesson/class/${props.lesson_id}`}>
        <LessonItemDescriptionContainer haveLeft={props.image_url != undefined}>
          <Name>{props.name}</Name>
          <div>
            <Location>지역: {props.location}</Location>
            <Price>가격: {props.price}</Price>
            <CommentWithHeart>댓글/하트: {props.comment_num}/{props.lessonLike_num}</CommentWithHeart>
          </div>
        </LessonItemDescriptionContainer>
        {props.image_url && <LessonItemImg src={props.image_url} alt="" />}
        <Buttons>
          {props.editable && <StyledButton to={`/lesson/write/${props.lesson_id}`}>수정</StyledButton>}
          {props.del && <StyledButton 
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                props.del && props.del(props.lesson_id);
              }} deleteBtn>삭제</StyledButton>}
        </Buttons>
      </ClassItemDescription>
    </LessonItemContainer>
  );
}