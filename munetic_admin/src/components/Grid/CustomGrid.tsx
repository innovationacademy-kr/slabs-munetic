import styled, { css } from 'styled-components';
import { useInfo } from '../../contexts/info';
import { useLocation } from 'react-router-dom';
import UserGrid from './User/UserGrid';
import Button from '../Button';
import LessonGrid from './Lesson/LessonGrid';

export default function CustomGrid() {
  const path = useLocation().pathname;
  const info = useInfo() as any;

  return (
    <InfoContainer>
      {path === `/users/${info!.id}` && <UserGrid />}
      {path === `/admin_users/${info!.id}` && <UserGrid />}
      {path === `/lessons/${info!.id}` && <LessonGrid />}
    </InfoContainer>
  );
}

const InfoContainer = styled.div`
  position: relative;
  background-color: #ecf0f3;
  border-radius: 0.5rem;
  overflow: scroll;
`;
