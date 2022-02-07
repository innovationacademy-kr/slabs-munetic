import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../style/palette';
import Button from '../common/Button';
import { InputBox } from '../common/Input';
import Select from '../common/Select';
import * as AuthAPI from '../../lib/api/auth';
import Contexts from '../../context/Contexts';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { dayList, monthList, yearList } from '../../lib/staticData';
import { Account } from '../../types/enums';
import client from '../../lib/api/client';

const Container = styled.form`
  margin: 100px 30px 30px 30px;
  padding: 30px;
  border-radius: 10px;
  background-color: ${palette.green};
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
      color: ${palette.green};
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
  font-size: 15px;
  margin-top: 10px;
  .selectTitle {
    line-height: 35px;
    font-weight: bold;
    color: ${palette.grayBlue};
    flex: 1 0 auto;
    height: 30px;
  }
  .selectBirthTitle {
    line-height: 35px;
    font-weight: bold;
    color: ${palette.grayBlue};
    flex: 1 0 auto;
    height: 30px;
    margin-right: 18px;
  }
  .select {
    font-weight: normal;
    font-size: 15px;
    text-align: center;
  }
  .selectBirth {
    display: flex;
  }
  .selectYear {
    flex: 2;
    margin-left: 3px;
  }
  .selectMonth {
    flex: 1;
    margin-left: 3px;
  }
  .selectDay {
    flex: 1;
    margin-left: 3px;
  }
`;

const StyledButton = styled(Button)`
  height: 40px;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  ::before {
    padding-top: 0%;
  }
`;

export default function Register() {
  const [getParams] = useSearchParams();
  const tutorParam = getParams.get('tutor');

  const { state, actions } = useContext(Contexts);
  const [registerInfo, setRegisterInfo] = useState({
    login_id: '',
    login_password: '',
    type: tutorParam ? Account.Tutor : Account.Student,
    nickname: '',
    name: '',
    email: '',
    birth: '',
    phone_number: '',
    gender: undefined,
  });

  const navigate = useNavigate();

  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [isValidId, setIsValidId] = useState(false);
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const {
    login_id,
    login_password,
    nickname,
    name,
    email,
    phone_number,
    gender,
  } = registerInfo;

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { value, name } = e.target;
    if (name === 'login_id') {
      setIsValidId(false);
    } else if (name === 'nickname') {
      setIsValidNickname(false);
    } else if (name === 'email') {
      setIsValidEmail(false);
    } else if (name === 'phone_number') {
      const phone_number_form = /^01([0-9])-([0-9]{3,4})-([0-9]{4})$/;
      if (phone_number_form.test(value)) {
        setIsValidPhone(true);
      } else {
        setIsValidPhone(false);
      }
    }
    setRegisterInfo({
      ...registerInfo,
      [name]: value,
    });
  };

  const onChangeBirth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    if (name === 'birthYear') {
      setBirthYear(value);
      setRegisterInfo({
        ...registerInfo,
        birth: `${value}-${birthMonth}-${birthDay}`,
      });
    } else if (name === 'birthMonth') {
      setBirthMonth(value);
      setRegisterInfo({
        ...registerInfo,
        birth: `${birthYear}-${value}-${birthDay}`,
      });
    } else {
      setBirthDay(value);
      setRegisterInfo({
        ...registerInfo,
        birth: `${birthYear}-${birthMonth}-${value}`,
      });
    }
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
      !login_id ||
      !login_password ||
      !passwordConfirm ||
      !nickname ||
      !name ||
      !gender ||
      !email ||
      !phone_number ||
      !birthYear ||
      !birthMonth ||
      !birthDay
    ) {
      return false;
    }
    if (login_password !== passwordConfirm) {
      return false;
    }
    if (!isValidId || !isValidNickname || !isValidEmail || !isValidPhone) {
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
        client.defaults.headers.common['Authorization'] = '';
        localStorage.removeItem('user');
        navigate('/auth/login');
      } catch (e) {
        console.log(e, '회원가입 실패');
      }
    }
  };

  const onClickCheckId = async (id: string) => {
    if (id) {
      try {
        await AuthAPI.isValidInfo(`login_id=${id}`);
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
        await AuthAPI.isValidInfo(`nickname=${nickname}`);
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
        await AuthAPI.isValidInfo(`email=${email}`);
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
            name="login_id"
            value={login_id}
            onChange={onChange}
            isValid={!!login_id}
          />
        </div>
        <span className="checkBtn" onClick={() => onClickCheckId(login_id)}>
          중복체크
        </span>
      </div>
      <InputBox
        inputName="비밀번호"
        value={login_password}
        name="login_password"
        type="password"
        onChange={onChange}
        isValid={!!login_password}
      />
      <InputBox
        inputName="비밀번호 확인"
        value={passwordConfirm}
        name="passwordConfirm"
        type="password"
        isValid={!!passwordConfirm && login_password === passwordConfirm}
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
            options={['Female', 'Male', 'Other']}
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
      <SelectContainer>
        <span className="selectBirthTitle">생년월일</span>
        <div className="selectBirth">
          <div className="selectYear">
            <Select
              options={yearList}
              value={birthYear}
              disabledOptions={['출생년도']}
              defaultValue="출생년도"
              name="birthYear"
              onChange={onChangeBirth}
              isValid={!!birthYear}
              errorMessage="출생년도를 선택하세요."
            />
          </div>
          <div className="selectMonth">
            <Select
              options={monthList}
              value={birthMonth}
              disabledOptions={['월']}
              defaultValue="월"
              name="birthMonth"
              onChange={onChangeBirth}
              isValid={!!birthMonth}
              errorMessage="월을 선택하세요."
            />
          </div>
          <div className="selectDay">
            <Select
              options={dayList}
              value={birthDay}
              disabledOptions={['일']}
              defaultValue="일"
              name="birthDay"
              onChange={onChangeBirth}
              isValid={!!birthDay}
              errorMessage="일을 선택하세요."
            />
          </div>
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
        placeholder="ex) 010-0000-0000"
        value={phone_number}
        name="phone_number"
        isValid={!!phone_number && isValidPhone}
        onChange={onChange}
        errorMessage="휴대폰 번호를 정확히 입력해주세요."
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
