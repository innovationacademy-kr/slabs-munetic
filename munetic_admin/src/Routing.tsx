import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import PostListPage from "./pages/PostListPage";
import UserListPage from "./pages/UserListPage";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/users" element={<UserListPage />} />
      <Route path="/posts" element={<PostListPage />} />
    </Routes>
  );
}
