import { useState } from 'react';
import styled from 'styled-components';
import palette from '../../style/palette';
import Button from '../common/Button';
import { InputBox } from '../common/Input';
import Select from '../common/Select';

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
  const [registerInfo, setRegisterInfo] = useState({
    id: '',
    password: '',
    nickname: '',
    name: '',
    email: '',
    phone_number: '',
    gender: undefined,
  });

  const { id, password, nickname, name, email, phone_number, gender } =
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

  const onSubmit = () => {
    console.log('ddd');
  };

  return (
    <Container>
      <InputBox inputName="아이디" name="id" value={id} onChange={onChange} />
      <InputBox
        inputName="패스워드"
        value={password}
        name="password"
        type="password"
        onChange={onChange}
      />
      <InputBox
        inputName="닉네임"
        value={nickname}
        name="nickname"
        onChange={onChange}
      />
      <InputBox inputName="이름" value={name} name="name" onChange={onChange} />
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
        onChange={onChange}
      />
      <InputBox
        inputName="휴대폰 번호"
        placeholder=""
        value={phone_number}
        name="phone_number"
        onChange={onChange}
      />
      <div className="registerButton">
        <StyledButton type="submit" onClick={onSubmit}>
          가입하기
        </StyledButton>
      </div>
    </Container>
  );
}
