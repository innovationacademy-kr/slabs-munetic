import styled, { css } from 'styled-components';
import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';

import CustomInput from '../Inputs/CustomInput';
import CustomPasswordInputs from '../Inputs/CustomPasswordInput';
import CustomSelect from '../Inputs/CustomSelect';
import Button from '../Button';
import * as Api from '../../lib/api';

interface AdminUserProps {
  rerender: () => void;
}

export function AddAdminUser({ rerender }: AdminUserProps) {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [password, setPassword] = useState('1234');
  const [name, setName] = useState('');
  const [auth, setAuth] = useState('Admin');
  const [showPassword, setShowPassword] = useState(false);
  const [buttonText, setButtonText] = useState('중복');

  const checkEmail = () => {
    Api.doubleCheck(`email=${email}`)
      .then(() => {
        setIsValid(true);
        setButtonText('✅');
      })
      .catch(() => {
        setIsValid(false);
        setButtonText('❌');
      });
  };

  const createUser = () => {
    Api.createUser({ email, login_password: password, name, type: auth })
      .then(() => {
        alert('계정이 성공적으로 생성되었습니다.');
        rerender();
      })
      .catch(err => alert(`${err.response}`));
  };

  return (
    <CreateUserContainer>
      <CreateUserHeader>Admin 계정 추가</CreateUserHeader>
      <CreateUserInputContainer>
        <CustomInput
          width="20rem"
          text="Email"
          fontSize="1.5rem"
          name="Email"
          value={email}
          onChangeEvent={e => {
            setEmail(e.target.value);
            setButtonText('중복');
          }}
          error={buttonText === '❌'}
        />
        <EmailButton onClick={checkEmail} disabled={!email}>
          {buttonText}
        </EmailButton>
        <Line />
        <CustomPasswordInputs
          width="15rem"
          fontSize="1.5rem"
          showPassword={showPassword}
          clickEvent={() => setShowPassword(!showPassword)}
          value={password}
          onChangeEvent={e => setPassword(e.target.value)}
        />
        <Line />
        <CustomInput
          width="15rem"
          text="Name"
          fontSize="1.5rem"
          name="Name"
          value={name}
          onChangeEvent={e => setName(e.target.value)}
        />
        <Line />
        <CustomSelect
          width="15rem"
          fontSize="1.5rem"
          value={auth}
          items={['Admin', 'Owner']}
          onChangeEvent={(e: SelectChangeEvent) => setAuth(e.target.value)}
        />
        <SubmitButton
          disabled={!isValid || !password || !name || !auth}
          onClick={createUser}
        >
          계정 생성
        </SubmitButton>
      </CreateUserInputContainer>
    </CreateUserContainer>
  );
}

const CreateUserContainer = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 0.3rem;

  margin-bottom: 1rem;
`;

const CreateUserHeader = styled.div`
  padding-top: 2rem;
  padding-left: 2rem;
`;

const CreateUserInputContainer = styled.div`
  display: flex;
  padding: 1rem 2rem;
`;

const EmailButton = styled(Button)`
  background-color: rgb(82, 111, 255);
  color: white;
  border-radius: 0.5rem;
  line-height: 0.3rem;
  width: 5rem;
  height: 3rem;
  margin-top: 2.5rem;
  ${props =>
    props.disabled &&
    css`
      background-color: rgb(140, 140, 140);
    `}
`;

const Line = styled.div`
  width: 0.1rem;
  height: 3rem;
  margin-top: 2.5rem;
  margin-left: 3rem;
  margin-right: 3rem;
  background-color: lightgrey;
`;

const SubmitButton = styled(Button)`
  background-color: rgb(82, 111, 255);
  border-radius: 0.5rem;
  line-height: 0.3rem;
  height: 3.5rem;
  width: 10rem;
  margin-top: 2.2rem;
  margin-left: 3rem;
  color: white;
  ${props =>
    props.disabled &&
    css`
      background-color: rgb(140, 140, 140);
    `}
`;
