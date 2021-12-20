import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components';
import ListUserInfo from './ListUserInfo';

export type UserInfoProps = {
  name: string;
  id: string;
  type: string;
  group: string;
  createdAt: string;
  lastLogin: string;
};

export default function ListUserCard({ ...userInfo }: UserInfoProps) {
  return (
    <ListCardContainer>
      <Checkbox />
      <ListUserInfo {...userInfo} />
    </ListCardContainer>
  );
}

const ListCardContainer = styled.li`
  display: flex;
  min-width: 90rem;
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 1rem;
  border-radius: 0.4rem;
  border: 0.2rem solid rgb(239, 239, 239);
`;
