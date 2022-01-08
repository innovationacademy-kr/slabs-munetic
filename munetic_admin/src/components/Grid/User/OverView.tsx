import styled, { css } from 'styled-components';
import { useUser } from '../../../contexts/user';
import Button from '../../Button';

export default function OverView() {
  const userInfo = useUser() as any;
  return (
    <>
      <UserImage url={userInfo.image_url} />
      <UserNickname>{userInfo.nickname}</UserNickname>
      <UserId>{userInfo.login_id}</UserId>
      <CustomButton disabled={userInfo.deletedAt}>회원 삭제</CustomButton>
    </>
  );
}

const UserImage = styled.div<{ url: string }>`
  background-color: rgb(149, 167, 255);
  background-image: ${props => `url(${props.url})`};
  background-size: cover;
  background-position: center;
  width: 11rem;
  height: 11rem;
  margin: 2rem auto 1.5rem auto;
  overflow: hidden;
  border-radius: 50%;
`;

const UserNickname = styled.p`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 0.7rem;
  color: #616060;
`;

const UserId = styled.p`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const CustomButton = styled(Button)`
  width: 15rem;
  background-color: rgb(82, 111, 255);
  display: block;
  margin: 0 auto;
  ${props =>
    props.disabled &&
    css`
      background-color: rgb(140, 140, 140);
    `}
`;
