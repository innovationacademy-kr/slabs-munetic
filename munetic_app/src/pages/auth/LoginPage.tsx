import styled from 'styled-components';
import Login from '../../components/auth/Login';
import Button from '../../components/common/Button';

const Container = styled.div`
  width: 60%;
  margin: 0px auto;
`;

const RegisterButton = styled(Button)`
  height: 40px;
  border-radius: 5px;
  margin-top: 30px;
  font-size: 18px;
  transition: all 0.7s ease;
  :hover {
    opacity: 0.8;
  }
  ::before {
    padding-top: 0%;
  }
`;
const CustomP = styled.p`
  text-align: center;
`;

export default function LoginPage() {
  return (
    <Container>
      <Login />
      <CustomP>OR</CustomP>
      <RegisterButton children="회원가입" to="/auth/register" />
    </Container>
  );
}
