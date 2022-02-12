import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/lesson/CategoryPage';
import ClassPage from './pages/lesson/ClassPage';
import ClassListPage from './pages/lesson/ClassListPage';
import ManageClassPage from './pages/lesson/ManageClassPage';
import WriteClassPage from './pages/lesson/WriteClassPage';
import ViewProfilePage from './pages/profile/ViewProfilePage';
import ManageProfilePage from './pages/profile/ManageProfilePage';
import EditProfilePage from './pages/profile/EditProfilePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ViewCommentPage from './pages/comment/ViewCommentPage';
import ViewMyLikesPage from './pages/profile/ViewMyLikesPage';
import SettingPage from './pages/SettingPage';
import HelpPage from './pages/setting/HelpPage';
import ContactPage from './pages/setting/ContactPage';
import AboutusPage from './pages/setting/AboutusPage';
import PolicyPage from './pages/setting/PolicyPage';
import LicensePage from './pages/setting/LicensePage';
import ViewMyBookmarksPage from './pages/bookmarks/ViewMyBookmarksPage';

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lesson/category" element={<CategoryPage />} />
      <Route path="/lesson/classes" element={<ClassListPage />} />
      <Route path="/lesson/class/:id" element={<ClassPage />} />
      <Route path="/lesson/manage" element={<ManageClassPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/lesson/write" element={<WriteClassPage />} />
      <Route path="/lesson/write/:id" element={<WriteClassPage />} />
      <Route path="/profile/:id" element={<ViewProfilePage />} />
      <Route path="/profile/comment/:id" element={<ViewCommentPage />} />
      <Route path="/profile/likes/" element={<ViewMyLikesPage />} />
      <Route path="/profile/manage" element={<ManageProfilePage />} />
      <Route path="/profile/edit/:id" element={<EditProfilePage />} />
      <Route path="/bookmark/" element={<ViewMyBookmarksPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/setting" element={<SettingPage />} />
      <Route path="/setting/help" element={<HelpPage />} />
      <Route path="/setting/contact" element={<ContactPage />} />
      <Route path="/setting/aboutus" element={<AboutusPage />} />
      <Route path="/setting/policy" element={<PolicyPage />} />
      <Route path="/setting/license" element={<LicensePage />} />
    </Routes>
  );
}
