import { useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { classData } from '../../dummy/classData';
import palette from '../../style/palette';
import Button from '../common/Button';

const ClassListContainer = styled.div`
  margin: 30px;
`;

const ClassItemContainer = styled(Link)`
  background-color: ${palette.grayBlue};
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 5px;
  .classItemDescription {
    flex: 1;
    width: 60%;
    margin: 10px 10px 10px 20px;
    display: flex;
    flex-direction: column;
  }
  .classItemTitle {
    margin: 5px 0px;
    padding: 1px 0px;
    color: ${palette.ivory};
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 17px;
    font-weight: bold;
  }
  .classItemCategory {
    font-size: 12px;
    font-weight: normal;
    color: #f1faee96;
  }
  .classItemImg {
    width: 60px;
    height: 60px;
    margin: 5px;
    align-items: right;
    border-radius: 50%;
  }
  .buttons {
    margin: 5px;
    display: flex;
    margin-left: auto;
  }
`;

interface StyledButtonProps {
  deleteBtn?: boolean;
  to?: string;
}

const StyledButton = styled(Button)<StyledButtonProps>`
  background-color: ${palette.ivory};
  font-size: 9px;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  margin-left: 5px;
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

interface lessonType {
  id: number;
  title: string;
  img: string;
  category: string;
}

interface IProps {
  lesson: lessonType;
  mode?: string;
}

export const ClassItem = ({ lesson, mode }: IProps) => {
  const { id, title, img, category } = lesson;

  const onClick = useCallback(id => {
    //추후 id로 레슨 삭제 예정
    alert(`이 id:${id}를 삭제하시겠습니까?`);
  }, []);

  return (
    <ClassItemContainer to={`/lesson/class/${id}`}>
      <div className="classItemDescription">
        <span className="classItemCategory">카테고리 : {category}</span>
        <span className="classItemTitle">{title}</span>
      </div>
      {mode === 'manage' ? (
        <div className="buttons">
          <StyledButton to="/lesson/write/id">수정</StyledButton>
          <StyledButton
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onClick(id);
            }}
            deleteBtn
          >
            삭제
          </StyledButton>
        </div>
      ) : (
        <img className="classItemImg" src={img} alt="" />
      )}
    </ClassItemContainer>
  );
};

export default function ClassList() {
  const [getParams, setParams] = useSearchParams();
  const categoryParam = getParams.get('category');
  return (
    <ClassListContainer>
      {classData &&
        (categoryParam === '전체'
          ? classData.map(lesson => (
              <ClassItem lesson={lesson} key={lesson.id} />
            ))
          : classData.map(lesson => {
              if (lesson.category === categoryParam) {
                return <ClassItem lesson={lesson} key={lesson.id} />;
              }
            }))}
    </ClassListContainer>
  );
}
