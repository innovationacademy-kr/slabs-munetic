import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

import ModalUser from './ModalUser';

type ModalProps = {
  onCloseModal?: () => void;
};

export default function Modal({ onCloseModal }: ModalProps) {
  return (
    <ModalBackground>
      <ModalContainer>
        <CloseIconDiv onClick={onCloseModal}>
          <CloseIcon fontSize="large" />
        </CloseIconDiv>
        <ModalUser />
      </ModalContainer>
    </ModalBackground>
  );
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  background-color: rgb(0, 0, 0, 0.5);
  z-index: 1000;
`;

const CloseIconDiv = styled.div`
  position: absolute;
  top: 2rem;
  right: 3rem;
  cursor: pointer;
`;

const ModalContainer = styled.div`
  position: relative;
  margin: 4rem auto;
  width: 50rem;
  height: 70rem;
  background-color: white;
  border-radius: 0.5rem;
  overflow: scroll;
`;
