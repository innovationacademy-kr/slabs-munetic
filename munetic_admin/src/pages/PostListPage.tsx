import { Button } from '@mui/material';
import List from '../components/List';
import lessonDummy from '../dummy/lessonDummy';
import ListContainer from '../components/ListContainer';
import ListCard from '../components/ListCard';
import CustomPagination from '../components/CustomPagination';
import ListLessonColumn from '../components/ListLessonColumn';

export default function PostListPage() {
  const lessonList: JSX.Element[] = lessonDummy.map(lesson => (
    <ListCard {...lesson} />
  ));

  return (
    <div>
      <Button sx={{ fontSize: 12 }} variant="outlined">
        게시물 생성
      </Button>
      <Button sx={{ fontSize: 12 }} variant="outlined">
        export
      </Button>
      <List />
      <CustomPagination />
    </div>
  );
}
