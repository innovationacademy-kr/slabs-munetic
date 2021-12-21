import UserOverview from './UserOverview';
import UserAdminMemo from './UserAdminMemo';
import UserAuthType from './UserAuthType';
import UserSpec from './UserSpec';
import UserPosts from './UserPosts';

export default function ModalUser() {
  return (
    <>
      <UserOverview />
      <UserAdminMemo />
      <UserAuthType />
      <UserSpec />
      <UserPosts />
    </>
  );
}
