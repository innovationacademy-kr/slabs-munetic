import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components';
import ListLessonInfo from './ListLessonInfo';

export type LessonInfoProps = {
  tutor: string;
  category: string;
  title: string;
  location: string;
  price: number | string;
  createdAt: string;
  deletedAt: string;
};

export default function ListLessonCard({ ...lessonInfo }: LessonInfoProps) {
  return (
    <ListCardContainer>
      <Checkbox />
      <ListLessonInfo {...lessonInfo} />
    </ListCardContainer>
  );
}

const ListCardContainer = styled.li`
  display: flex;
  min-width: 90rem;
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 1rem;
  border-radius: 0.4rem;
  border: 0.2rem solid rgb(239, 239, 239);
`;
