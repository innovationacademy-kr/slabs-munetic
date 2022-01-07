import styled from 'styled-components';
import { Grid } from '@mui/material';
import OverView from './OverView';
import UserInfo from './UserInfo';
import AdminMemo from './AdminMemo';
import UserPosts from './UserPosts';

export default function UserGrid() {
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid item xs={3} sx={{ mb: 3 }}>
        <Item>
          <OverView />
        </Item>
      </Grid>
      <Grid item xs={9} sx={{ mb: 3 }}>
        <Item>
          <UserInfo />
        </Item>
      </Grid>
      <Grid item xs={12} sx={{ mb: 3 }}>
        <Item>
          <AdminMemo />
        </Item>
      </Grid>
      <Grid item xs={12} sx={{ mb: 3 }}>
        <UserPosts />
      </Grid>
    </Grid>
  );
}

const Item = styled.div`
  background-color: white;
  border: 0.1rem solid white;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 0.7rem lightgrey;
  height: 100%;
  padding: 1rem 1rem 0.5rem 1rem;
`;
