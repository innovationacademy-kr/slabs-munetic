import { useLocation } from 'react-router-dom';
import userDummy from '../dummy/userDummy';
import lessonDummy from '../dummy/lessonDummy';
import ListCard from './ListCard';
import ListContainer from './ListContainer';
import ListLessonColumn from './ListLessonColumn';

export default function List() {
  const path = useLocation().pathname;
  const userList: JSX.Element[] = userDummy.map(user => <ListCard {...user} />);
  const lessonList: JSX.Element[] = lessonDummy.map(lesson => (
    <ListCard {...lesson} />
  ));

  return (
    <ListContainer>
      <ListLessonColumn />
      {path === '/users' ? userList : lessonList}
    </ListContainer>
  );
}
