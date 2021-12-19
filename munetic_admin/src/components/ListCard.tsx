import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components';

export default function ListCard(props: any) {
  return (
    <ListCardContainer>
      <Checkbox />
      <UserInfo>
        <UserName>{props.userInfo.name}</UserName>
        <UserId>{props.userInfo.id}</UserId>
        <UserAuth>{props.userInfo.auth}</UserAuth>
        <UserGroup>{props.userInfo.group}</UserGroup>
        <CreatedAt>{props.userInfo.createdAt}</CreatedAt>
        <LastLogin>{props.userInfo.lastLogin}</LastLogin>
      </UserInfo>
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

const UserInfo = styled.div`
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
const UserAuth = styled.div`
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
