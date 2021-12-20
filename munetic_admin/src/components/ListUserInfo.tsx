import styled from 'styled-components';
import { UserInfoProps } from './ListUserCard';

export default function ListUserInfo({
  name,
  id,
  type,
  group,
  createdAt,
  lastLogin,
}: UserInfoProps) {
  return (
    <UserListContainer>
      <UserName>{name}</UserName>
      <UserId>{id}</UserId>
      <UserType>{type}</UserType>
      <UserGroup>{group}</UserGroup>
      <CreatedAt>{createdAt}</CreatedAt>
      <LastLogin>{lastLogin}</LastLogin>
    </UserListContainer>
  );
}

const UserListContainer = styled.div`
  flex: 1;
  display: flex;
  margin: auto 0;
  padding-left: 1rem;
`;

const UserName = styled.div`
  flex: 0.5;
`;
const UserId = styled.div`
  flex: 1;
`;
const UserType = styled.div`
  flex: 1;
`;
const UserGroup = styled.div`
  flex: 2;
`;
const CreatedAt = styled.div`
  flex: 1;
`;
const LastLogin = styled.div`
  flex: 1;
`;
