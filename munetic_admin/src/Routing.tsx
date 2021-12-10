import { Route, Routes } from 'react-router';
import Home from './components/Home';
import Posts from './components/Posts';
import Users from './components/Users';

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/posts" element={<Posts />} />
    </Routes>
  );
}
