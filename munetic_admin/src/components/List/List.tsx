import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import userDummy from '../../dummy/userDummy';
import lessonDummy from '../../dummy/lessonDummy';

import ListCard from './ListCard';
import ListLessonColumn from './ListLessonColumn';
import ListUserColumn from './ListUserColumn';

export default function List() {
  const path = useLocation().pathname;
  const userList: JSX.Element[] = userDummy.map(user => <ListCard {...user} />);
  const lessonList: JSX.Element[] = lessonDummy.map(lesson => (
    <ListCard {...lesson} />
  ));

  return (
    <ListContainer>
      {path === '/users' ? <ListUserColumn /> : <ListLessonColumn />}
      {path === '/users' ? userList : lessonList}
    </ListContainer>
  );
}

const ListContainer = styled.ul`
  height: 80%;
  padding: 1.5rem 2rem;
  margin-top: 1rem;
  border: 0.2rem solid rgb(239, 239, 239);
`;
