import { Link, useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import palette from '../../style/palette';
import { LessonData } from '../../types/lessonData';
import Button from '../common/Button';
import { useEffect, useState } from 'react';
import * as LessonAPI from '../../lib/api/lesson';
import Pagination from '../common/Pagination';

const ClassListContainer = styled.div`
  margin: 30px;
  margin-bottom: 66px;
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

interface IProps {
  lesson: LessonData;
  mode?: string;
  onClickDelete?: (id: number) => void;
}

export const ClassItem = ({ lesson, mode, onClickDelete }: IProps) => {
  const { lesson_id, image_url } = lesson;
  const { title, category } = lesson.editable;

  return (
    <ClassItemContainer to={`/lesson/class/${lesson_id}`}>
      <div className="classItemDescription">
        <span className="classItemCategory">카테고리 : {category}</span>
        <span className="classItemTitle">{title}</span>
      </div>
      {mode === 'manage' && onClickDelete ? (
        <div className="buttons">
          <StyledButton to={`/lesson/write/${lesson_id}`}>수정</StyledButton>
          <StyledButton
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onClickDelete(lesson_id);
            }}
            deleteBtn
          >
            삭제
          </StyledButton>
        </div>
      ) : (
        <img className="classItemImg" src={image_url} alt="" />
      )}
    </ClassItemContainer>
  );
};

export default function ClassList() {
  const [getParams, setParams] = useSearchParams();
  const [classes, setClasses] = useState<LessonData[]>();
  const [classCount, setClassCount] = useState(0);
  const categoryParam = getParams.get('category');
  const itemsPerPage = 5;

  const handlePageClick = async (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % classCount;
    try {
      const res = await LessonAPI.getLessons(itemsPerPage, newOffset);
      setClasses(res.data.data.rows);
    } catch (e) {
      console.log(e, 'id로 레슨을 불러오지 못했습니다.');
    }
  };

  useEffect(() => {
    async function getLessons(limit: number, offset: number) {
      try {
        const res = await LessonAPI.getLessons(limit, offset);
        setClasses(res.data.data.rows);
        setClassCount(res.data.data.count);
      } catch (e) {
        console.log(e, '레슨 전체 목록을 불러오지 못했습니다.');
      }
    }
    getLessons(itemsPerPage, 0);
  }, []);
  return (
    <ClassListContainer>
      {classes &&
        (categoryParam === '전체'
          ? classes.map(lesson => (
              <ClassItem lesson={lesson} key={lesson.lesson_id} />
            ))
          : classes.map(lesson => {
              if (lesson.editable.category === categoryParam) {
                return <ClassItem lesson={lesson} key={lesson.lesson_id} />;
              }
            }))}
      {classCount > 0 ? (
        <Pagination
          itemsPerPage={itemsPerPage}
          classCount={classCount}
          handlePageClick={e => handlePageClick(e)}
        />
      ) : (
        ''
      )}
    </ClassListContainer>
  );
}
