import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './common/Button';

const Container = styled.div`
  margin: 30px 0px;
  width: 100%;
  .homeButtonWrapper {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .homeFindButton {
    width: 40%;
    height: 40%;
  }
  .homeRegisterButton {
    width: 40%;
    height: 40%;
  }
`;

export default function Home() {
  return (
    <Container>
      <div className="homeButtonWrapper">
        <div className="homeFindButton">
          <Button to="/lesson/category">레슨 찾기</Button>
        </div>
        <div className="homeRegisterButton">
          <Button to="/lesson/write">레슨 등록</Button>
        </div>
      </div>
    </Container>
  );
}
