import { useContext } from 'react';
import styled from 'styled-components';
import palette from '../../style/palette';
import Contexts from '../../context/Contexts';

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
  .errorMessage {
    font-size: 12px;
    font-weight: normal;
    color: ${palette.red};
    margin: 5px 0px;
  }
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isReadOnly?: boolean;
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
}

const InputBoxContainer = styled.div`
  margin-top: 10px;
  display: flex;
  font-size: 15px;
  .inputTitle {
    line-height: 35px;
    font-weight: bold;
    color: ${palette.grayBlue};
    flex: 1;
    height: 30px;
  }
  .input {
    font-weight: normal;
    font-size: 16px;
    text-align: center;
    border: none;
    border-bottom: 1px solid ${palette.grayBlue};
    color: ${palette.grayBlue};
    height: 30px;
  }
`;
interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputName: string;
  isReadOnly?: boolean;
  useValidation?: boolean;
  isValid?: boolean;
  errorMessage?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
}

export const InputBox = ({
  inputName,
  isReadOnly,
  useValidation,
  onChange,
  isValid,
  errorMessage,
  ...props
}: InputBoxProps) => {
  return (
    <InputBoxContainer>
      <span className="inputTitle">{inputName}</span>
      <Input
        className="input"
        isReadOnly={isReadOnly}
        useValidation={useValidation}
        isValid={isValid}
        onChange={onChange}
        errorMessage={errorMessage}
        {...props}
      />
    </InputBoxContainer>
  );
};

export default function Input({
  isReadOnly = false,
  isValid,
  useValidation = true,
  errorMessage = '값을 입력하세요',
  ...props
}: IProps) {
  //폼 제출할 때 validationMode를 true 로 바꿔서 유효값이 들어갔는지 판단하기위한 것
  const { state } = useContext(Contexts);

  return (
    <Container isReadOnly={isReadOnly}>
      <input readOnly={isReadOnly} {...props} />
      {useValidation && state.validationMode && !isValid && (
        <div className="errorMessage">
          <p>{errorMessage}</p>
        </div>
      )}
    </Container>
  );
}