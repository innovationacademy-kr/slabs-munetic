import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../style/palette';

const Container = styled.button`
  width: 100%;
  border: 0;
  border-radius: 20px;
  background-color: ${palette.grayBlue};
  color: ${palette.green};
  font-size: 20px;
  font-weight: bold;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  ::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
  .buttonText {
    width: 100%;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  to?: string;
}

const Button = ({ children, to, ...props }: IProps) => {
  const navigate = useNavigate();
  return (
    <Container
      onClick={e => {
        if (to) {
          e.preventDefault();
          e.stopPropagation();
          navigate(to);
        }
      }}
      {...props}
    >
      <span className="buttonText">{children}</span>
    </Container>
  );
};

export default Button;
