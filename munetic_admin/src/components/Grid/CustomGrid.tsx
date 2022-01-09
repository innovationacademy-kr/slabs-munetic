import styled, { css } from 'styled-components';
import { useUser } from '../../contexts/user';
import { useLocation } from 'react-router-dom';
import UserGrid from './User/UserGrid';
import Button from '../Button';

export default function CustomGrid() {
  const path = useLocation().pathname;
  const userInfo = useUser() as any;

  return (
    <GridContainer>
      {path === `/users/${userInfo!.id}` && <UserGrid />}
      {path === `/admin_users/${userInfo!.id}` && <UserGrid />}
    </GridContainer>
  );
}

const GridContainer = styled.div`
  position: relative;
  margin: auto;
  background-color: #ecf0f3;
  border-radius: 0.5rem;
  overflow: scroll;
`;
