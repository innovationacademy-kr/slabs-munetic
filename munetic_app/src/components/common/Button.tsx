import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.button`
  width: 100%;
  border: 0;
  border-radius: 20px;
  background-color: #457b9d;
  color: #f1faee;
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

const Button = ({ children, to, ...props }: IProps) => {
  return (
    <Link to={to}>
      <Container {...props}>
        <span className="buttonText">{children}</span>
      </Container>
    </Link>
  );
};

export default Button;
