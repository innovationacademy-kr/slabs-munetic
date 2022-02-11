import styled from 'styled-components';
import palette from '../../style/palette';
import Button from '../common/Button';

const InitialPageContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
align-items: center;
justify-content: center;
background-color: ${palette.ivory};
`;

const InitialPageCard = styled.div`
width: 80%;
height: 80%;
padding: 4rem 0rem 3.5rem 0rem;
border-radius: 20px;
background-color: ${palette.grayBlue};
`;

const Logo = styled.h1`
text-align: center;
font-size: 3rem;
font-weight: 700;
margin-top: 20px;
color: ${palette.ivory};
`;

const Buttons = styled.div`
width: auto;
padding: 10rem 2rem 2.5rem 2rem;
`;

const CustomButton = styled(Button)`
display: block;
height: 40px;
color: ${palette.grayBlue};
background-color: ${palette.ivory};
margin-top: 20px;
margin-bottom: 20px;
`;

export default function LoggedOut() {
  return (
    <InitialPageContainer>
      <InitialPageCard>
        <div>
          <Logo>
            <span>MUNETIC</span>
          </Logo>
          <Buttons>
            <CustomButton to='/auth/login'>로그인</CustomButton>
            <CustomButton to='/auth/register'>회원가입</CustomButton>
          </Buttons>
        </div>
      </InitialPageCard>
    </InitialPageContainer>
  );
}