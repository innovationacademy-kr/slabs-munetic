import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../style/palette';
import Button from '../common/Button';
import { InputBox } from '../common/Input';
import Select from '../common/Select';
import * as AuthAPI from '../../lib/api/auth';
import Contexts from '../../context/Contexts';
import { useNavigate } from 'react-router-dom';

const Container = styled.form`
  margin: 100px 30px 30px 30px;
  padding: 30px;
  border-radius: 10px;
  background-color: ${palette.ivory};
  .registerButton {
    margin-top: 40px;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  font-size: 16px;
  margin-top: 10px;
  .selectTitle {
    line-height: 35px;
    font-weight: bold;
    color: ${palette.grayBlue};
    flex: 1;
    height: 30px;
  }
  .select {
    font-weight: normal;
    font-size: 16px;
    text-align: center;
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

export default function Register() {
  const { state, actions } = useContext(Contexts);
  const [registerInfo, setRegisterInfo] = useState({
    userId: '',
    password: '',
    nickname: '',
    name: '',
    email: '',
    phone_number: '',
    gender: undefined,
  });

  const navigate = useNavigate();

  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { userId, password, nickname, name, email, phone_number, gender } =
    registerInfo;

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { value, name } = e.target;
    setRegisterInfo({
      ...registerInfo,
      [name]: value,
    });
  };

  const onChangePasswordConfirm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setPasswordConfirm(e.target.value);
  };

  const validateSignupForm = () => {
    if (
      !userId ||
      !password ||
      !passwordConfirm ||
      !nickname ||
      !name ||
      !gender ||
      !email ||
      !phone_number
    ) {
      return false;
    }
    if (password !== passwordConfirm) {
      return false;
    }
    return true;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    actions.setValidationMode(true);

    if (validateSignupForm()) {
      try {
        await AuthAPI.signup(registerInfo);
        navigate('/');
      } catch (e) {
        console.log(e, '회원가입 실패');
      }
    }
  };

  useEffect(() => {
    return () => {
      actions.setValidationMode(false);
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
      />
      <InputBox
        inputName="비밀번호"
        value={password}
        name="password"
        type="password"
        onChange={onChange}
        isValid={!!password}
      />
      <InputBox
        inputName="비밀번호 확인"
        value={passwordConfirm}
        name="passwordConfirm"
        type="password"
        isValid={!!passwordConfirm && password === passwordConfirm}
        errorMessage="비밀번호를 확인해주세요."
        onChange={e => onChangePasswordConfirm(e)}
      />
      <InputBox
        inputName="닉네임"
        value={nickname}
        name="nickname"
        isValid={!!nickname}
        onChange={onChange}
      />
      <InputBox
        inputName="이름"
        value={name}
        name="name"
        isValid={!!name}
        onChange={onChange}
      />
      <SelectContainer>
        <span className="selectTitle">성별</span>
        <div className="select">
          <Select
            options={['Female', 'Male', 'Others']}
            value={gender}
            disabledOptions={['성별']}
            defaultValue="성별"
            name="gender"
            onChange={onChange}
            isValid={!!gender}
            errorMessage="성별을 선택하세요."
          />
        </div>
      </SelectContainer>
      <InputBox
        inputName="이메일"
        value={email}
        name="email"
        type="email"
        isValid={!!email}
        onChange={onChange}
      />
      <InputBox
        inputName="휴대폰 번호"
        placeholder=""
        value={phone_number}
        name="phone_number"
        isValid={!!phone_number}
        onChange={onChange}
      />
      <div className="registerButton">
        <StyledButton type="submit">가입하기</StyledButton>
      </div>
    </Container>
  );
}
