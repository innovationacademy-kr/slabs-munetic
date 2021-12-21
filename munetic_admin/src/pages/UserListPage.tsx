import Button from '@mui/material/Button';
import userDummy from '../dummy/userDummy';
import List from '../components/List/List';
import ListCard from '../components/List/ListCard';
import CustomPagination from '../components/CustomPagination';

export default function UserListPage() {
  const userList: JSX.Element[] = userDummy.map(user => <ListCard {...user} />);

  return (
    <div>
      <Button sx={{ fontSize: 12 }} variant="outlined">
        회원 생성
      </Button>
      <Button sx={{ fontSize: 12 }} variant="outlined">
        export
      </Button>
      <List />
      <CustomPagination />
    </div>
  );
}
