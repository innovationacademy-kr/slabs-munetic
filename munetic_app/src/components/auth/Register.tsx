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
    margin-top: 20px;
  }
  .checkWrapper {
    display: flex;
    .checkInput {
      flex: 1 0 auto;
    }
    .checkBtn {
      flex-shrink: 0;
      font-size: 13px;
      color: ${palette.ivory};
      border: 0;
      border-radius: 5px;
      background-color: ${palette.grayBlue};
      margin: 10px 0px 0px 5px;
      line-height: 30px;
      height: 30px;
    }
  }
  .dupErrorMessage {
    text-align: center;
    color: ${palette.red};
    font-size: 14px;
    margin-top: 15px;
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

  const [isValidId, setIsValidId] = useState(false);
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

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
    if (!isValidId || !isValidNickname || !isValidEmail) {
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

  const onClickCheckId = async (id: string) => {
    //get 요청 query형태에 따라 다시 바꾸자. 현재는 /api/auth/user?kunlee
    if (id) {
      try {
        await AuthAPI.isValidInfo(id);
        alert('이 아이디는 사용할 수 있습니다!');
        setIsValidId(true);
      } catch (e) {
        alert('중복된 아이디가 존재합니다.');
        console.log(e, '중복된 아이디!');
      }
    }
  };

  const onClickCheckNickname = async (nickname: string) => {
    if (nickname) {
      try {
        await AuthAPI.isValidInfo(nickname);
        alert('이 닉네임은 사용할 수 있습니다!');
        setIsValidNickname(true);
      } catch (e) {
        alert('중복된 닉네임이 존재합니다.');
        console.log(e, '중복된 닉네임!');
      }
    }
  };

  const onClickCheckEmail = async (email: string) => {
    if (email) {
      try {
        await AuthAPI.isValidInfo(email);
        alert('이 이메일은 사용할 수 있습니다!');
        setIsValidEmail(true);
      } catch (e) {
        alert('중복된 이메일이 존재합니다.');
        console.log(e, '중복된 이메일!');
      }
    }
  };

  useEffect(() => {
    return () => {
      actions.setValidationMode(false);
      setIsValidId(false);
      setIsValidNickname(false);
      setIsValidEmail(false);
    };
  }, []);

  return (
    <Container onSubmit={onSubmit}>
      <div className="checkWrapper">
        <div className="checkInput">
          <InputBox
            inputName="아이디"
            name="userId"
            value={userId}
            onChange={onChange}
            isValid={!!userId}
          />
        </div>
        <span className="checkBtn" onClick={() => onClickCheckId(userId)}>
          중복체크
        </span>
      </div>
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
      <div className="checkWrapper">
        <div className="checkInput">
          <InputBox
            inputName="닉네임"
            value={nickname}
            name="nickname"
            isValid={!!nickname}
            onChange={onChange}
          />
        </div>
        <span
          className="checkBtn"
          onClick={() => onClickCheckNickname(nickname)}
        >
          중복체크
        </span>
      </div>
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
      <div className="checkWrapper">
        <div className="checkInput">
          <InputBox
            inputName="이메일"
            value={email}
            name="email"
            type="email"
            isValid={!!email}
            onChange={onChange}
          />
        </div>
        <span className="checkBtn" onClick={() => onClickCheckEmail(email)}>
          중복체크
        </span>
      </div>
      <InputBox
        inputName="휴대폰 번호"
        placeholder=""
        value={phone_number}
        name="phone_number"
        isValid={!!phone_number}
        onChange={onChange}
      />
      {state.validationMode &&
        (!isValidId || !isValidNickname || !isValidEmail) && (
          <div className="dupErrorMessage">중복체크를 해주세요.</div>
        )}
      <div className="registerButton">
        <StyledButton type="submit">가입하기</StyledButton>
      </div>
    </Container>
  );
}
