import styled from 'styled-components';

import NonFlexContainer from './NonFlexContainer';
import ModalTitle from './ModalTitle';
import UserLessonList from './UserLessonList';

export default function UserPosts() {
  return (
    <NonFlexContainer>
      <ModalTitle>작성한 레슨 글</ModalTitle>
      <ul>
        <UserLessonList />
      </ul>
    </NonFlexContainer>
  );
}
