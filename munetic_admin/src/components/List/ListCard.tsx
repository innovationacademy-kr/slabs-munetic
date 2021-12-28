import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Checkbox from '@mui/material/Checkbox';
import ListLessonInfo from './ListLessonInfo';
import ListUserInfo from './ListUserInfo';
import Modal from '../Modal/Modal';

export type UserInfoProps = {
  onOpenModal?: () => void;
  name: string;
  id: string;
  type: string;
  group: string;
  createdAt: string;
  lastLogin: string;
};

export type LessonInfoProps = {
  onOpenModal?: () => void;
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
  const [modalOn, setModalOn] = useState(false);
  const onOpenModal = () => {
    setModalOn(true);
    /**
     * list key값으로 배정돼있는 userId 값을 바탕으로 해당 유저 상세정보를 불러오는 get 요청 필요
     */
  };

  const onCloseModal = () => {
    setModalOn(false);
  };

  console.log(modalOn);
  const path = useLocation().pathname;
  return (
    <ListCardContainer>
      <Checkbox />
      {path === '/users' ? (
        <ListUserInfo
          {...(cardInfo as UserInfoProps)}
          onOpenModal={onOpenModal}
        />
      ) : (
        <ListLessonInfo
          {...(cardInfo as LessonInfoProps)}
          onOpenModal={onOpenModal}
        />
      )}
      {path === '/users' && modalOn ? (
        <Modal onCloseModal={onCloseModal} />
      ) : (
        ''
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
