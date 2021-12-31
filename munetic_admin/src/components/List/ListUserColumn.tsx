import styled from 'styled-components';
import { ListColumnContainer } from './ListColumnContainer';
import ListUserInfo from './ListUserInfo';

export default function ListUserColumn() {
  const column = {
    name: '이름',
    id: '아이디',
    type: '유형',
    group: '그룹',
    createdAt: '생성일',
    lastLogin: '마지막 로그인',
  };

  return (
    <ListColumnContainer>
      <div />
      <ListUserInfo {...column} />
    </ListColumnContainer>
  );
}
