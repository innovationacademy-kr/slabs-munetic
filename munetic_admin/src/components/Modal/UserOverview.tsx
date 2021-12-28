import styled from 'styled-components';
import { FlexContainer } from './FlexComponents';

export default function UserOverview() {
  return (
    <FlexContainer>
      <IdAndImage>
        <UserImage></UserImage>
        <UserId>chaepark</UserId>
      </IdAndImage>
      <UserActivity>
        <h1>가입일 :</h1>
        <h1>앱 접속 횟수 :</h1>
        <h1>최근 로그인 :</h1>
      </UserActivity>
    </FlexContainer>
  );
}

const IdAndImage = styled.div`
  flex: 1;
  text-align: center;
`;

const UserImage = styled.div`
  width: 12rem;
  height: 12rem;
  margin: 1rem;
  overflow: hidden;
  border-radius: 100%;
  background-color: pink;
`;

const UserId = styled.h1`
  font-size: 1.4rem;
`;

const UserActivity = styled.div`
  flex: 3;
  margin: 8.5rem 1rem 0rem 3rem;
  padding: 0.5rem;
  border: 2px solid rgb(239, 239, 239);
  > h1 {
    text-align: left;
    &:not(:last-child) {
      padding-bottom: 1rem;
    }
  }
`;
