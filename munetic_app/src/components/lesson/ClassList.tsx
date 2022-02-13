import { Link, useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import palette from '../../style/palette';
import { LessonData } from '../../types/lessonData';
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
        (
          categoryParam === '전체'
          ? classes.map(lesson => (
              <LessonItem
                lesson_id={lesson.lesson_id}
                category={lesson.editable.category}
                title={lesson.editable.title}
                key={lesson.lesson_id}
                image_url={lesson.image_url}
                />
            ))
          : classes.map(lesson => {
              if (lesson.editable.category === categoryParam) {
                <LessonItem
                  lesson_id={lesson.lesson_id}
                  category={lesson.editable.category}
                  title={lesson.editable.title}
                  key={lesson.lesson_id}
                  image_url={lesson.image_url}
                  />
              }
            })
            )
      }
      <Pagination
        itemsPerPage={itemsPerPage}
        classCount={classCount}
        handlePageClick={e => handlePageClick(e)}
      />
    </ClassListContainer>
  );
}
