import styled from 'styled-components';
import { LessonInfoProps } from './ListLessonCard';

export default function ListLessonInfo({
  tutor,
  category,
  title,
  location,
  price,
  createdAt,
  deletedAt,
}: LessonInfoProps) {
  return (
    <LessonListContainer>
      <TutorName>{tutor}</TutorName>
      <LessonCategory>{category}</LessonCategory>
      <LessonTitle>{title}</LessonTitle>
      <LessonLocation>{location}</LessonLocation>
      <LessonPrice>{price}</LessonPrice>
      <CreatedAt>{createdAt}</CreatedAt>
      <DeletedAt>{deletedAt}</DeletedAt>
    </LessonListContainer>
  );
}

const LessonListContainer = styled.div`
  flex: 1;
  display: flex;
  margin: auto 0;
  padding-left: 1rem;
`;

const TutorName = styled.div`
  flex: 0.5;
`;
const LessonCategory = styled.div`
  flex: 1;
`;
const LessonTitle = styled.div`
  flex: 1;
`;
const LessonLocation = styled.div`
  flex: 1;
`;
const LessonPrice = styled.div`
  flex: 1;
`;
const CreatedAt = styled.div`
  flex: 1;
`;
const DeletedAt = styled.div`
  flex: 1;
`;
