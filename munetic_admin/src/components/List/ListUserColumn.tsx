import styled from 'styled-components';
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

const ListColumnContainer = styled.li`
  display: flex;
  min-width: 90rem;
  font-size: 1.3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  border-radius: 0.4rem;
  > div {
    width: 3.5rem;
  }
`;
