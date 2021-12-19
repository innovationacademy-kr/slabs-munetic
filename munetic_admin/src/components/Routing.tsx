import styled from 'styled-components';
import { Route, Routes } from 'react-router';
import HomePage from '../pages/HomePage';
import PostListPage from '../pages/PostListPage';
import UserListPage from '../pages/UserListPage';

export default function Routing() {
  return (
    <RoutesContainer>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/posts" element={<PostListPage />} />
      </Routes>
    </RoutesContainer>
  );
}

const RoutesContainer = styled.div`
  position: relative;
  top: 3.7rem;
  padding: 3rem 3rem;
  min-width: 110rem;
  height: 80vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 1.6rem;
`;
