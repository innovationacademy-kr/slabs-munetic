import styled from 'styled-components';

export default function UserLessonList() {
  return (
    <LessonList>
      <Category>보컬</Category>
      <Title>보컬 입시 합니다.</Title>
      <CreatedAt>2021-02-01</CreatedAt>
      <Button>상세보기</Button>
    </LessonList>
  );
}
const LessonList = styled.li`
  height: 3rem;
  padding: 0 1rem;
  border: 0.2rem solid rgb(239, 239, 239);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Category = styled.div`
  flex: 1;
`;
const Title = styled.div`
  flex: 3;
`;

const CreatedAt = styled.div`
  flex: 2;
`;
const Button = styled.button``;
