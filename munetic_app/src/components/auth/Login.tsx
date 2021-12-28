import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../style/palette';
import Button from '../common/Button';
import { InputBox } from '../common/Input';
import * as AuthAPI from '../../lib/api/auth';
import Contexts from '../../context/Contexts';
import { useNavigate } from 'react-router-dom';

const Container = styled.form`
  margin: 250px 30px 30px 30px;
  padding: 30px;
  border-radius: 10px;
  background-color: ${palette.ivory};
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
  const { state, actions } = useContext(Contexts);
  const [loginInfo, setLoginInfo] = useState({
    userId: '',
    password: '',
  });
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const navigate = useNavigate();

  const { userId, password } = loginInfo;

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
    if (!userId || !password) {
      return false;
    }
    return true;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    actions.setValidationMode(true);

    if (validateLoginForm()) {
      try {
        await AuthAPI.login(loginInfo);
        navigate('/');
      } catch (e) {
        setShowErrorMessage(true);
        console.log(e, '회원가입 실패');
      }
    }
  };

  useEffect(() => {
    return () => {
      actions.setValidationMode(false);
      setShowErrorMessage(false);
    };
  }, []);

  return (
    <Container onSubmit={onSubmit}>
      <InputBox
        inputName="아이디"
        name="userId"
        value={userId}
        onChange={onChange}
        isValid={!!userId}
        errorMessage="아이디를 입력하세요."
      />
      <InputBox
        inputName="비밀번호"
        value={password}
        name="password"
        type="password"
        onChange={onChange}
        isValid={!!password}
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
