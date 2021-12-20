import Button from '@mui/material/Button';
import userDummy from '../dummy/userDummy';
import ListContainer from '../components/ListContainer';
import ListUserCard from '../components/ListUserCard';
import ListUserColumn from '../components/ListUserColumn';
import CustomPagination from '../components/CustomPagination';

export default function UserListPage() {
  const userList: JSX.Element[] = userDummy.map(user => (
    <ListUserCard {...user} />
  ));

  return (
    <div>
      <Button sx={{ fontSize: 12 }} variant="outlined">
        회원 생성
      </Button>
      <Button sx={{ fontSize: 12 }} variant="outlined">
        export
      </Button>
      <ListContainer>
        <ListUserColumn />
        {userList}
      </ListContainer>
      <CustomPagination />
    </div>
  );
}
