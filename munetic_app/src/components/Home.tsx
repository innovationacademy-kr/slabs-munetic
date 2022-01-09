import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './common/Button';
import * as Auth from '../lib/api/auth';
import * as ProfileAPI from '../lib/api/profile';
import client from '../lib/api/client';

const Container = styled.div`
  margin: 30px 0px;
  width: 100%;
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

  const onClickProfileView = async () => {
    try {
      const res = await ProfileAPI.getMyProfile();
      console.log(res.data.data);
    } catch (e) {
      console.log(e, '내 프로필 보기 실패');
    }
  };

  const onClickProfileViewOthers = async () => {
    try {
      const id = 3;
      const res = await ProfileAPI.getProfileById(id);
      console.log(res.data.data);
    } catch (e) {
      console.log(e, '다른 사람 프로필 보기 실패');
    }
  };

  const onClickProfileEdit = async () => {
    try {
      const newData = {
        type: 'Tutor',
        nickname: 'kunkun',
        name_public: true,
        phone_public: true,
        image_url: '/img/testImg.png',
        introduction:
          'testafajsfjsadfhasjfhawfhaofhouasdhfuasdhfausfhasudfhasudfhasfhsaduofhasodufhasduofhasdfasdfjkashfj',
      };
      const res = await ProfileAPI.updateProfile(newData);
      console.log(res.data.data);
    } catch (e) {
      console.log(e, '내 프로필 수정 실패');
    }
  };

  return (
    <Container>
      <div className="homeButtonWrapper">
        <div className="homeFindButton">
          <Button to="/lesson/category">레슨 찾기</Button>
        </div>
        <div className="homeRegisterButton">
          <Button to="/lesson/manage">레슨 등록</Button>
        </div>
      </div>
      <button onClick={loggedUser ? onClickLogout : onClickLogin}>
        {loggedUser ? '로그아웃' : '로그인'}
      </button>
      <button onClick={onClickSignup}>회원가입</button>
      <button onClick={onClickProfileView}>내 프로필 조회</button>
      <button onClick={onClickProfileEdit}>내 프로필 수정</button>
      <button onClick={onClickProfileViewOthers}>다른 사람 프로필 조회</button>
    </Container>
  );
}
