import { Button } from '@mui/material';
import List from '../components/List/List';
import lessonDummy from '../dummy/lessonDummy';
import ListCard from '../components/List/ListCard';
import CustomPagination from '../components/CustomPagination';

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
