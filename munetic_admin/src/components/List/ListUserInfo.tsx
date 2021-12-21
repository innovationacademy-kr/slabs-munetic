import styled from 'styled-components';

import { UserInfoProps } from './ListCard';
import ListInfoContainer from './ListInfoContainer';

export default function ListUserInfo({
  onOpenModal,
  name,
  id,
  type,
  group,
  createdAt,
  lastLogin,
}: UserInfoProps) {
  return (
    <ListInfoContainer onClick={onOpenModal}>
      <UserName>{name}</UserName>
      <UserId>{id}</UserId>
      <UserType>{type}</UserType>
      <UserGroup>{group}</UserGroup>
      <CreatedAt>{createdAt}</CreatedAt>
      <LastLogin>{lastLogin}</LastLogin>
    </ListInfoContainer>
  );
}

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
