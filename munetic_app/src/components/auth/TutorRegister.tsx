import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import palette from '../../style/palette';
import Button from '../common/Button';
import { InputBox } from '../common/Input';
import * as AuthAPI from '../../lib/api/auth';
import { ITutorInfoType } from '../../types/userSignupData';

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

const StyledButton = styled(Button)`
  height: 40px;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  ::before {
    padding-top: 0%;
  }
`;

export default function TutorRegister() {

  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState<ITutorInfoType>({
    spec: '',
    career: '',
    youtube: '',
    instagram: '',
    soundcloud: '',
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    try {
      await AuthAPI.tutorsignup(registerInfo);
      navigate('/profile/manage');
    } catch (e) {
      console.log(e, '회원가입 실패');
    }
  };

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

  return (
    <Container onSubmit={onSubmit}>
      <InputBox
        inputName="학력"
        name="spec"
        value={registerInfo.spec}
        onChange={onChange}
      />
      <InputBox
        inputName="레슨 경력"
        name="career"
        value={registerInfo.career}
        onChange={onChange}
      />
      <InputBox
        inputName="유튜브 채널 링크 (선택)"
        name="youtube"
        value={registerInfo.youtube}
        onChange={onChange}
      />
      <InputBox
        inputName="인스타 아이디 (선택)"
        name="instagram"
        value={registerInfo.instagram}
        onChange={onChange}
      />
      <InputBox
        inputName="사운드클라우드 아이디 (선택)"
        name="soundcloud"
        value={registerInfo.soundcloud}
        onChange={onChange}
      />
      <div className="registerButton">
        <StyledButton type="submit">튜터 가입하기</StyledButton>
      </div>
    </Container>
  );
}
