import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './common/Button';
import * as Auth from '../lib/api/auth';
import client from '../lib/api/client';
import BottomMenu from './common/BottomMenu';
import palette from '../style/palette';

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 40px;
  .homeButtonWrapper {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .homeFindButton {
    width: 40%;
    height: 40%;
  }
  .homeRegisterButton {
    width: 40%;
    height: 40%;
  }
`;

const InitialPageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${palette.ivory};
`;

const InitialPageCard = styled.div`
  width: 80%;
  height: 80%;
  padding: 4rem 0rem 3.5rem 0rem;
  border-radius: 20px;
  background-color: ${palette.grayBlue};
`;

const Logo = styled.h1`
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  margin-top: 20px;
  color: ${palette.ivory};
`;

const Buttons = styled.div`
  width: auto;
  padding: 10rem 2rem 2.5rem 2rem;
`;

const CustomButton = styled(Button)`
  display: block;
  height: 40px;
  color: ${palette.grayBlue};
  background-color: ${palette.ivory};
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default function Home() {
  const [loggedUser, setLoggedUser] = useState(localStorage.getItem('user'));

  const navigate = useNavigate();

  const onClickLogin = () => {
    navigate('/auth/login');
  };

  const onClickLogout = async () => {
    try {
      await Auth.logout();
      try {
        client.defaults.headers.common['Authorization'] = '';
        localStorage.removeItem('user');
      } catch (e) {
        console.log(e, 'localStorage is not working');
      }
      setLoggedUser(localStorage.getItem('user'));
    } catch (e) {
      console.log(e, '로그아웃 실패');
    }
  };

  const onClickSignup = () => {
    navigate('/auth/register');
  };
  const onClickSignupTutor = () => {
    navigate('/auth/register?tutor=tutor');
  };

  return (
    <>
    {loggedUser ? 
    (
      <>
      <Container>
        <div className="homeButtonWrapper">
          <div className="homeFindButton">
            <Button to="/lesson/category">레슨 찾기</Button>
          </div>
          <div className="homeRegisterButton">
            {loggedUser ? (
              <Button to="/lesson/manage">레슨 등록</Button>
            ) : (
              <Button to="/auth/register?tutor=tutor">
                레슨 등록(선생님 계정 필요)
              </Button>
            )}
          </div>
        </div>
        <button onClick={onClickLogout}>로그아웃</button>
        <button onClick={onClickSignupTutor}>튜터 회원가입</button>
      </Container>
      <BottomMenu />
      </>
    ) : (
      <InitialPageContainer>
        <InitialPageCard>
          <div>
            <Logo>
              <span>MUNETIC</span>
            </Logo>
            <Buttons>
              <CustomButton onClick={onClickLogin}>로그인</CustomButton>
              <CustomButton onClick={onClickSignup}>회원가입</CustomButton>
            </Buttons>
          </div>
        </InitialPageCard>
      </InitialPageContainer>
    )
    }
    </>
  );
}
