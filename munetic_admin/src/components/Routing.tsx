import styled from 'styled-components';
import { Route, Routes } from 'react-router';
import HomePage from '../pages/HomePage';
import PostListPage from '../pages/PostListPage';
import UserListPage from '../pages/UserListPage';
import AdminUserListPage from '../pages/AdminUserListPage';
import LoginPage from '../pages/LoginPage';

export default function Routing() {
  return (
    <RoutesContainer>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/admin_users" element={<AdminUserListPage />} />
        <Route path="/posts" element={<PostListPage />} />
      </Routes>
    </RoutesContainer>
  );
}

const RoutesContainer = styled.div`
  position: relative;
  /* top: 6.5rem; */
  padding: 3rem 3rem;
  min-width: 110rem;
  /* height: 90vh; */
  display: flex;
  justify-content: center;
  font-size: 1.6rem;
`;
