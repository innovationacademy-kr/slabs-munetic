import styled from 'styled-components';

import ModalTitle from './ModalTitle';
import NonFlexContainer from './NonFlexContainer';
import { FlexInner, LeftContainer, RightContainer } from './FlexComponents';

export default function UserSpec() {
  return (
    <NonFlexContainer>
      <ModalTitle>유저 정보</ModalTitle>
      <FlexInner>
        <LeftContainer>
          <Text>이름 :</Text>
          <Text>생년월일 :</Text>
        </LeftContainer>
        <RightContainer>
          <Text>이메일 :</Text>
          <Text>활동 지역 :</Text>
        </RightContainer>
      </FlexInner>
      <Text>소개</Text>
      <SelfIntro>sdsdsdf</SelfIntro>
    </NonFlexContainer>
  );
}

const Text = styled.p`
  padding-bottom: 1rem;
`;

const SelfIntro = styled.div`
  border: 2px solid rgb(239, 239, 239);
  line-height: 150%;
  height: 5rem;
`;
