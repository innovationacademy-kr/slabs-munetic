import styled from 'styled-components';

import { LessonInfoProps } from './ListCard';
import ListInfoContainer from './ListInfoContainer';

export default function ListLessonInfo({
  onOpenModal,
  tutor,
  category,
  title,
  location,
  price,
  createdAt,
  deletedAt,
}: LessonInfoProps) {
  return (
    <ListInfoContainer onClick={onOpenModal}>
      <TutorName>{tutor}</TutorName>
      <LessonCategory>{category}</LessonCategory>
      <LessonTitle>{title}</LessonTitle>
      <LessonLocation>{location}</LessonLocation>
      <LessonPrice>{price}</LessonPrice>
      <CreatedAt>{createdAt}</CreatedAt>
      <DeletedAt>{deletedAt}</DeletedAt>
    </ListInfoContainer>
  );
}
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
