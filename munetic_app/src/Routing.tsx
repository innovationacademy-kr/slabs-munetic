import { Route, Routes } from 'react-router';
import Home from './components/Home';
import Category from './components/lesson/Category';
import Class from './components/lesson/Class';
import ClassLists from './components/lesson/ClassLists';
import ManageClass from './components/lesson/ManageClass';
import EditClass from './components/lesson/EditClass';
import WriteClass from './components/lesson/WriteClass';
import ViewProfile from './components/profile/ViewProfile';
import ManageProfile from './components/profile/ManageProfile';
import EditProfile from './components/profile/EditProfile';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lesson/category" element={<Category />} />
      <Route path="/lesson/classes" element={<ClassLists />} />
      <Route path="/lesson/class/:id" element={<Class />} />
      <Route path="/lesson/manage" element={<ManageClass />} />
      <Route path="/lesson/write" element={<WriteClass />} />
      <Route path="/lesson/write/:id" element={<EditClass />} />
      <Route path="/profile/:id" element={<ViewProfile />} />
      <Route path="/profile/manage/:id" element={<ManageProfile />} />
      <Route path="/profile/edit/:id" element={<EditProfile />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
    </Routes>
  );
}
