import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../style/palette';
import Button from '../common/Button';
import { InputBox } from '../common/Input';
import * as AuthAPI from '../../lib/api/auth';
import Contexts from '../../context/Contexts';
import { useNavigate } from 'react-router-dom';
import client from '../../lib/api/client';

const Container = styled.form`
  margin: 250px 30px 30px 30px;
  padding: 30px;
  border-radius: 10px;
  background-color: ${palette.green};
  .loginErrorMessage {
    text-align: center;
    font-size: 12px;
    font-weight: normal;
    color: ${palette.red};
    margin: 15px 0px 10px 0px;
  }
  .loginButton {
    margin-top: 20px;
  }
`;

const StyledButton = styled(Button)`
  height: 40px;
  border-radius: 5px;
  font-size: 18px;
  ::before {
    padding-top: 0%;
  }
`;

export default function Login() {
  const { actions } = useContext(Contexts);
  const [loginInfo, setLoginInfo] = useState({
    login_id: '',
    login_password: '',
  });
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const navigate = useNavigate();

  const { login_id, login_password } = loginInfo;

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { value, name } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const validateLoginForm = () => {
    if (!login_id || !login_password) {
      return false;
    }
    return true;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    actions.setValidationMode(true);

    if (validateLoginForm()) {
      try {
        const res = await AuthAPI.login(loginInfo);
        const { data: accessToken } = res.data;
        client.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;
        try {
          localStorage.setItem('user', JSON.stringify(login_id));
        } catch (e) {
          console.log(e, 'localStorage is not working');
        }
        navigate('/');
      } catch (e) {
        setShowErrorMessage(true);
        console.log(e, '로그인 실패');
      }
    }
  };

  useEffect(() => {
    return () => {
      actions.setValidationMode(false);
      setShowErrorMessage(false);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, []);

  return (
    <Container onSubmit={onSubmit}>
      <InputBox
        inputName="아이디"
        name="login_id"
        value={login_id}
        onChange={onChange}
        isValid={!!login_id}
        errorMessage="아이디를 입력하세요."
      />
      <InputBox
        inputName="비밀번호"
        value={login_password}
        name="login_password"
        type="password"
        onChange={onChange}
        isValid={!!login_password}
        errorMessage="비밀번호를 입력하세요."
      />
      {showErrorMessage && (
        <div className="loginErrorMessage">회원정보가 일치하지 않습니다.</div>
      )}
      <div className="loginButton">
        <StyledButton type="submit">로그인</StyledButton>
      </div>
    </Container>
  );
}
