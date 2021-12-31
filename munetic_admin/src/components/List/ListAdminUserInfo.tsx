import styled from 'styled-components';
import { AdminUserInfoProps } from './ListCard';
import ListInfoContainer from './ListInfoContainer';

export default function ListAdminUserInfo({
  onOpenModal,
  name,
  email,
  team,
  auth,
  createdAt,
  deletedAt,
}: AdminUserInfoProps) {
  return (
    <ListInfoContainer onClick={onOpenModal}>
      <UserName>{name}</UserName>
      <UserEmail>{email}</UserEmail>
      <UserTeam>{team}</UserTeam>
      <UserAuth>{auth}</UserAuth>
      <CreatedAt>{createdAt}</CreatedAt>
      <DeletedAt>{deletedAt}</DeletedAt>
    </ListInfoContainer>
  );
}

const UserName = styled.div`
  flex: 0.5;
`;
const UserEmail = styled.div`
  flex: 1;
`;
const UserTeam = styled.div`
  flex: 1;
`;
const UserAuth = styled.div`
  flex: 2;
`;
const CreatedAt = styled.div`
  flex: 1;
`;
const DeletedAt = styled.div`
  flex: 1;
`;
