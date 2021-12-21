import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components';
import { useState } from 'react';
import ListLessonInfo from './ListLessonInfo';
import ListUserInfo from './ListUserInfo';
import { useLocation } from 'react-router-dom';

export type UserInfoProps = {
  onClick?: () => void;
  name: string;
  id: string;
  type: string;
  group: string;
  createdAt: string;
  lastLogin: string;
};

export type LessonInfoProps = {
  onClick?: () => void;
  tutor: string;
  category: string;
  title: string;
  location: string;
  price: number | string;
  createdAt: string;
  deletedAt: string;
};

export default function ListCard({
  ...cardInfo
}: UserInfoProps | LessonInfoProps) {
  const [modalOn, setModalon] = useState(false);
  const onOpenModal = () => {
    setModalon(!modalOn);
    console.log(modalOn);
  };

  const path = useLocation().pathname;
  return (
    <ListCardContainer>
      <Checkbox />
      {path === '/users' ? (
        <ListUserInfo {...(cardInfo as UserInfoProps)} onClick={onOpenModal} />
      ) : (
        <ListLessonInfo
          {...(cardInfo as LessonInfoProps)}
          onClick={onOpenModal}
        />
      )}
    </ListCardContainer>
  );
}

const ListCardContainer = styled.li`
  display: flex;
  min-width: 90rem;
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 1rem;
  border-radius: 0.4rem;
  border: 0.2rem solid rgb(239, 239, 239);
`;
