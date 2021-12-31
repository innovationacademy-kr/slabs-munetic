import ListAdminUserInfo from './ListAdminUserInfo';
import { ListColumnContainer } from './ListColumnContainer';

export default function ListAdminUserColumn() {
  const column = {
    name: '이름',
    team: '소속',
    auth: '권한',
    email: '이메일',
    createdAt: '생성일',
    deletedAt: '삭제일',
  };

  return (
    <ListColumnContainer>
      <div />
      <ListAdminUserInfo {...column} />
    </ListColumnContainer>
  );
}
