import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.button`
  width: 100%;
  border: 0;
  border-radius: 20px;
  background-color: #0168fa;
  color: #00f8b6;
  font-size: 20px;
  font-weight: bold;
  position: relative;
  ::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
  .buttonText {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  to: string;
}

const Button: React.FC<IProps> = ({ children, to, ...props }) => {
  return (
    <Link to={to}>
      <Container {...props}>
        <span className="buttonText">{children}</span>
      </Container>
    </Link>
  );
};

export default Button;
