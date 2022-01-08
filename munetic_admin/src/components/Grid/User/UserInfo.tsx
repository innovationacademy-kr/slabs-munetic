import styled from 'styled-components';
import { useUser } from '../../../contexts/user';
import Title from '../Common/Title';

export default function UserInfo() {
  const userInfo = useUser() as any;

  return (
    <>
      <Title> 유저 정보 </Title>
      <TextField>
        <p>이름</p>
        <div>{userInfo.name}</div>
      </TextField>
      <TextFields>
        <TextField>
          <p>생년월일</p>
          <div>{userInfo.birth}</div>
        </TextField>
        <TextField_>
          <p>성별</p>
          <div>{userInfo.gender}</div>
        </TextField_>
      </TextFields>
      <TextField>
        <p>이메일</p>
        <div>{userInfo.email || '없음'}</div>
      </TextField>
      <TextField>
        <p>휴대폰</p>
        <div>{userInfo.phone_number || '없음'}</div>
      </TextField>
      <TextField>
        <p>자기 소개</p>
        <div>{userInfo.introduction}</div>
      </TextField>
      <TextField>
        <p>생성일</p>
        <div>{userInfo.createdAt}</div>
      </TextField>
      <TextField>
        <p>삭제일</p>
        <div>{userInfo.deletedAt || '없음'}</div>
      </TextField>
    </>
  );
}

const TextFields = styled.div`
  display: flex;
  width: 100%;
`;

const TextField = styled.div`
  flex: 1;
  padding-top: 1rem;
  padding-left: 1rem;
  display: flex;
  width: 100%;
  & p {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.7rem;
    width: 7rem;
  }
  & div {
    padding-bottom: 0.3rem;
    font-size: 1.3rem;
    min-width: 10rem;
    max-width: 30rem;
  }
`;

const TextField_ = styled.div`
  flex: 1;
  padding-top: 1rem;
  display: flex;
  width: 100%;
  & p {
    border-left: 0.1rem solid grey;
    padding-left: 3rem;
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.7rem;
    width: 5rem;
  }

  & div {
    padding-bottom: 0.3rem;
    font-size: 1.3rem;
  }
`;
