import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import userDummy from '../../dummy/userDummy';
import lessonDummy from '../../dummy/lessonDummy';
import adminUserDummy from '../../dummy/adminUserDummy';

import ListCard from './ListCard';
import ListLessonColumn from './ListLessonColumn';
import ListUserColumn from './ListUserColumn';
import ListAdminUserColumn from './ListAdminUserColumn';

export default function List() {
  const path = useLocation().pathname;
  const userList: JSX.Element[] = userDummy.map(user => <ListCard {...user} />);
  const lessonList: JSX.Element[] = lessonDummy.map(lesson => (
    <ListCard {...lesson} />
  ));
  const adminUserList: JSX.Element[] = adminUserDummy.map(user => (
    <ListCard {...user}></ListCard>
  ));

  return (
    <ListContainer>
      {path === '/users' && <ListUserColumn />}
      {path === '/users' && userList}
      {path === '/posts' && <ListLessonColumn />}
      {path === '/posts' && lessonList}
      {path === '/admin_users' && <ListAdminUserColumn />}
      {path === '/admin_users' && adminUserList}
    </ListContainer>
  );
}

const ListContainer = styled.ul`
  height: 80%;
  overflow: scroll;
  padding: 1.5rem 2rem;
  margin-top: 1rem;
  border: 0.2rem solid rgb(239, 239, 239);
`;
