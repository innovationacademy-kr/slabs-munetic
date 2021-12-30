import styled from 'styled-components';

import NonFlexContainer from './NonFlexContainer';
import ModalTitle from './ModalTitle';

export default function UserAdminMemo() {
  return (
    <NonFlexContainer>
      <ModalTitle>관리자 메모</ModalTitle>
      <AdminMemo>메모를 히스토리별로 기록해야할 필요는 없는걸까?</AdminMemo>
      <FlexButtons>
        <Button>save</Button>
        <Button>edit</Button>
      </FlexButtons>
    </NonFlexContainer>
  );
}

const AdminMemo = styled.div`
  margin-top: 1rem;
  height: 6rem;
  border: 2px solid rgb(239, 239, 239);
  line-height: 150%;
`;

const FlexButtons = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row-reverse;
`;

const Button = styled.button`
  &:not(:first-child) {
    margin-right: 1rem;
  }
`;
