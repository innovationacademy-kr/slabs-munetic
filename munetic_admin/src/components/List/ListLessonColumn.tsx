import styled from 'styled-components';
import { ListColumnContainer } from './ListColumnContainer';
import ListLessonInfo from './ListLessonInfo';

export default function ListLessonColumn() {
  const column = {
    tutor: '이름',
    category: '카테고리',
    title: '제목',
    location: '장소',
    price: '가격',
    createdAt: '작성일',
    deletedAt: '삭제일',
  };

  return (
    <ListColumnContainer>
      <div />
      <ListLessonInfo {...column} />
    </ListColumnContainer>
  );
}
