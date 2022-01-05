import styled from 'styled-components';
import { Route, Routes } from 'react-router';
import HomePage from '../pages/HomePage';
import PostListPage from '../pages/PostListPage';
import UserListPage from '../pages/UserListPage';
import AdminUserPage from '../pages/AdminUserPage';
import LoginPage from '../pages/LoginPage';

export default function Routing() {
  return (
    <RoutesContainer>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/admin_users" element={<AdminUserPage />} />
        <Route path="/posts" element={<PostListPage />} />
      </Routes>
    </RoutesContainer>
  );
}

const RoutesContainer = styled.div`
  position: relative;
  padding: 3rem 3rem;
  min-width: 110rem;
  justify-content: center;
  font-size: 1.6rem;
`;
