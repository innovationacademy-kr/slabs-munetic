import { Button } from '@mui/material';
import lessonDummy from '../dummy/lessonDummy';
import ListContainer from '../components/ListContainer';
import ListLessonCard from '../components/ListLessonCard';
import CustomPagination from '../components/CustomPagination';
import ListLessonColumn from '../components/ListLessonColumn';

export default function PostListPage() {
  const lessonList: JSX.Element[] = lessonDummy.map(lesson => (
    <ListLessonCard {...lesson} />
  ));

  return (
    <div>
      <Button sx={{ fontSize: 12 }} variant="outlined">
        게시물 생성
      </Button>
      <Button sx={{ fontSize: 12 }} variant="outlined">
        export
      </Button>
      <ListContainer>
        <ListLessonColumn />
        {lessonList}
      </ListContainer>
      <CustomPagination />
    </div>
  );
}
