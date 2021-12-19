import ListCard from '../components/ListCard';
import ListConatiner from '../components/ListContainer';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import styled from 'styled-components';
import userDummy from '../dummy/userDummy';

export default function UserListPage() {
  return (
    <div>
      <Button variant="outlined">회원 생성</Button>
      <Button variant="outlined">export</Button>
      <ListConatiner>
        {userDummy.map(user => (
          <ListCard userInfo={user}></ListCard>
        ))}
      </ListConatiner>
      <PaginationMargin>
        <Pagination count={5}></Pagination>
      </PaginationMargin>
    </div>
  );
}

const PaginationMargin = styled.div`
  margin-left: 30rem;
  margin-top: 3rem;
  display: inline-block;
`;
