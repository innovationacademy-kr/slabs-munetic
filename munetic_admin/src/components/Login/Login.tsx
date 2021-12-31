import styled from 'styled-components';
import { Button } from '../Button';

export default function Login() {
  return (
    <LoginContainer>
      <LoginCard>
        <Logo>Munetic</Logo>
        <Fields>
          <InputContainer>
            <input placeholder="email" name="email" type="email" />
          </InputContainer>
          <InputContainer>
            <input placeholder="password" name="password" type="password" />
          </InputContainer>
        </Fields>
        <CustomButton>Login</CustomButton>
      </LoginCard>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  background-color: #ecf0f3;
`;

const LoginCard = styled.div`
  width: 30rem;
  height: 30vh;
  padding: 4rem 3.5rem 3.5rem 3.5rem;
  border-radius: 40px;
  background-color: #ecf0f3;
  box-shadow: 1.3rem 1rem 1.3rem #cbced1, -1.3rem -1.3rem 2rem #fff;
`;

const Logo = styled.h1`
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  color: rgb(82, 111, 255);
`;

const Fields = styled.div`
  margin-top: 2rem;
  width: 100%;
  padding: 1.5rem 0.5rem 0.5rem 0.5rem;
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
  margin: 0 auto;
  width: 100%;
  background-color: rgb(82, 111, 255);
`;
