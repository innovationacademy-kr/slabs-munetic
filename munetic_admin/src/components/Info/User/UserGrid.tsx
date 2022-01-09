import styled from 'styled-components';
import { Grid } from '@mui/material';
import OverView from './OverView';
import UserInfo from './UserInfo';
import AdminMemo from './AdminMemo';
import UserPosts from './UserPosts';
import { useInfo } from '../../../contexts/info';
import Item from '../Common/Item';

export default function UserGrid() {
  const info = useInfo() as any;

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
      {info.type === 'Tutor' && (
        <Grid item xs={12} sx={{ mb: 3 }}>
          <UserPosts />
        </Grid>
      )}
    </Grid>
  );
}
