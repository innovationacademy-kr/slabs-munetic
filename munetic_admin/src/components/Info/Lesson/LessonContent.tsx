import styled from 'styled-components';
import Title from '../Common/Title';
import { useInfo } from '../../../contexts/info';

export default function LessonContent() {
  const info = useInfo() as any;

  return (
    <>
      <Title>작성 내용</Title>
      <Content>{info.content}</Content>
    </>
  );
}

const Content = styled.div`
  padding: 1rem;
`;
