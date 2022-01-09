import styled from 'styled-components';
import { Route, Routes } from 'react-router';
import HomePage from '../pages/HomePage';
import LessonListPage from '../pages/LessonListPage';
import UserListPage from '../pages/UserListPage';
import AdminUserPage from '../pages/AdminUserPage';
import AdminUserInfoPage from '../pages/AdminUserInfoPage';
import UserProvider from '../contexts/user';
import UserInfoPage from '../pages/UserInfoPage';

export default function Routing() {
  return (
    <RoutesContainer>
      <UserProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/users/:id" element={<UserInfoPage />} />
          <Route path="/admin_users" element={<AdminUserPage />} />
          <Route path="/admin_users/:id" element={<AdminUserInfoPage />} />
          <Route path="/lessons" element={<LessonListPage />} />
        </Routes>
      </UserProvider>
    </RoutesContainer>
  );
}

const RoutesContainer = styled.div`
  position: relative;
  padding: 8rem 3rem 3rem 3rem;
  min-width: 110rem;
  justify-content: center;
  font-size: 1.6rem;
`;
