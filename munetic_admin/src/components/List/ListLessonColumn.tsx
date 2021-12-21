import styled from 'styled-components';
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

const ListColumnContainer = styled.li`
  display: flex;
  min-width: 90rem;
  font-size: 1.3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  border-radius: 0.4rem;
  > div {
    width: 3.5rem;
  }
`;
