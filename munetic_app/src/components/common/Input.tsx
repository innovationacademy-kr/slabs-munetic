import styled from 'styled-components';
import palette from '../../style/palette';

interface ContainerProps {
  isReadOnly: boolean;
}

const Container = styled.div<ContainerProps>`
  input {
    border-radius: 4px;
    outline: none;
    background-color: ${({ isReadOnly }) =>
      isReadOnly ? `${palette.ivory}` : ''};
  }
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isReadOnly?: boolean;
}

export default function Input({ isReadOnly = false, ...props }: IProps) {
  return (
    <Container isReadOnly={isReadOnly}>
      <input readOnly={isReadOnly} {...props} />
    </Container>
  );
}
