import styled, { css } from 'styled-components';
import { useState } from 'react';
import Button from '../Button';
import CustomPasswordInputs from '../Inputs/CustomPasswordInput';
import * as Api from '../../lib/api';
import { useLoginUpdate } from '../../contexts/login';

export default function PasswordChange() {
  const setLogin = useLoginUpdate();
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const loginHandler = () => {
    const login_id = JSON.parse(localStorage.getItem('user') as string);
    Api.login({
      login_id: login_id,
      login_password: password,
    })
      .then(() => setIsValid(true))
      .catch(err => {
        if (err.response) alert(err.response.data);
        else alert(err.message);
      });
  };

  const updatePasswordHandler = () => {
    Api.updatePassword({ login_password: newPassword })
      .then(() => {
        alert(
          '비밀번호가 성공적으로 변경되었습니다. 새 비밀번호로 다시 로그인 해주세요.',
        );
        Api.logout()
          .then(res => {
            Api.instance.defaults.headers.common['Authorization'] = '';
            localStorage.removeItem('user');
            if (setLogin) setLogin(false);
          })
          .catch(err => console.log(err.response));
      })
      .catch(err => alert(err.response.data));
  };
  return (
    <PasswordCard>
      {!isValid ? (
        <>
          <Fields>
            <p>현재 비밀번호를 입력해주세요.</p>
            <CustomPasswordInputs
              width="27rem"
              fontSize="1.5rem"
              showPassword={showPassword}
              clickEvent={() => setShowPassword(!showPassword)}
              value={password}
              onChangeEvent={e => setPassword(e.target.value)}
            />
          </Fields>
          <CustomButton disabled={!password} onClick={loginHandler}>
            확인
          </CustomButton>
        </>
      ) : (
        <>
          <Fields>
            <p>새 비밀번호를 입력해주세요.</p>
            <CustomPasswordInputs
              width="27rem"
              fontSize="1.5rem"
              showPassword={showPassword}
              clickEvent={() => setShowPassword(!showPassword)}
              value={newPassword}
              onChangeEvent={e => setNewPassword(e.target.value)}
            />
          </Fields>
          <CustomButton disabled={!newPassword} onClick={updatePasswordHandler}>
            변경
          </CustomButton>
        </>
      )}
    </PasswordCard>
  );
}

const PasswordCard = styled.div`
  margin: 10rem auto;
  width: 30rem;
  height: 25rem;
  padding: 3rem 3.5rem 3.5rem 3.5rem;
  border-radius: 40px;
  background-color: #ecf0f3;
  box-shadow: 1.3rem 1rem 1.3rem #cbced1, -1.3rem -1.3rem 2rem #fff;
`;

const Fields = styled.div`
  margin-top: 3rem;
  width: 100%;
  padding: 1.5rem 0.5rem 0.5rem 0.5rem;
  & p {
    font-size: 1.5rem;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
`;

const InputContainer = styled.div`
  &:not(:last-child) {
  }
  margin-bottom: 2rem;
  border-radius: 2.5rem;
  box-shadow: inset 0.3rem 0.3rem 0.3rem #cbced1,
    inset -0.1rem -0.1rem 0.1rem #fff;
  > input {
    border: none;
    outline: none;
    background: transparent;
    color: #555;
    font-size: 1.5rem;
    padding: 1rem 0.5rem 1rem 2rem;
  }
`;

const CustomButton = styled(Button)`
  display: block;
  margin-top: 1rem;
  margin-left: 2rem;
  width: 85%;
  background-color: rgb(82, 111, 255);
  ${props =>
    props.disabled &&
    css`
      background-color: rgb(140, 140, 140);
    `}
`;
