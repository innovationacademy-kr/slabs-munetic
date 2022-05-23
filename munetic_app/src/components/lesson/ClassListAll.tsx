import styled, { css } from 'styled-components';
import palette from '../../style/palette';
import { ILessonData } from '../../types/lessonData';
import Button from '../common/Button';
import { useEffect, useState } from 'react';
import * as LessonAPI from '../../lib/api/lesson';
import Pagination from '../common/Pagination';
import { LessonItem } from './lessonlist/LessonItem';

const ClassListContainer = styled.div`
  margin: 30px;
  margin-bottom: 66px;
`;

interface StyledButtonProps {
  deleteBtn?: boolean;
  to?: string;
}

export const StyledButton = styled(Button)<StyledButtonProps>`
  background-color: ${palette.green};
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

/**
 * ClassList 컴포넌트의 프로퍼티 정의
 */
export interface ClassListIProps {
  category_id?: number;
}

export default function ClassListAll() {
  const [classes, setClasses] = useState<ReadonlyArray<ILessonData>>([]);
  const [classCount, setClassCount] = useState<number>(0);
  const itemsPerPage = 5;

  const getList = async (limit: number, offset: number) => {
    try {
      let res;
      res = await LessonAPI.getLessonsAll(limit, offset);
      setClasses(res.data.data.rows);
      setClassCount(res.data.data.count);
    } catch (e) {
      console.log(e, '레슨 리스트를 불러오지 못했습니다.');
    }
  };

  const handlePageClick = async (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % classCount;
    await getList(itemsPerPage, newOffset);
  };

  useEffect(() => {
    getList(itemsPerPage, 0);
  }, []);
  return (
    <ClassListContainer>
    {
      classes.map(lesson => (
        <LessonItem
          lesson_id={lesson.id}
          category={lesson.Category.name || ""}
          title={lesson.title || ""}
          name = {lesson.User.name || ""}
          location={lesson.location || ""}
          price={lesson.price || 0}
          comment_num={lesson.CommentsCount || 0}
          lessonLike_num={lesson.LessonLikesCount || 0}
          key={lesson.id}
          image_url={lesson.User.image_url}
          />
      ))
    }
    <Pagination
      itemsPerPage={itemsPerPage}
      classCount={classCount}
      handlePageClick={e => handlePageClick(e)}
    />
    </ClassListContainer>
  );
}
