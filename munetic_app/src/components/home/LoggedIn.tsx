import styled from 'styled-components';
import Button from '../common/Button';
import VideoEmbed from '../media/VideoEmbed';
import ViewTutorsProfile from '../profile/ViewTutorsProfile';


const Container = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
  border-radius: 40px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const ButtonWrapper = styled.div`
  width: 40%;
  height: 40%;
`;

export default function LoggedIn({type}: {type: string}) {
  return (
    <Container>
      <ButtonsWrapper>
        <ButtonWrapper>
          <Button to="/lesson/category">레슨 찾기</Button>
        </ButtonWrapper>
        <ButtonWrapper>
          { type !== "student" ? (
                <Button to="/lesson/manage">레슨 등록</Button>
            ) : (
              <Button to="/auth/register?tutor=tutor">
                레슨 등록<br />(선생님 계정 필요)
              </Button>
            )
          }
        </ButtonWrapper>
      </ButtonsWrapper>
      <ViewTutorsProfile />
      <VideoEmbed title='베스트 연주 영상' id='ldxVFDvWCgg' />
    </Container>
  );
}