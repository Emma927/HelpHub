import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages
import Layout from '@/layout/Layout';
import Home from '@/pages/Home';
import Announcements from '@/pages/Announcements';
import AnnouncementDetails from '@/pages/AnnouncementDetails';
import News from '@/pages/News';
import About from '@/pages/About';
import NotFound from '@/pages/NotFound';
// User
import UserLoginForm from '@/user/UserLoginForm';
import UserRegisterForm from '@/user/UserRegisterForm';
import ProtectedRoute from '@/user/ProtectedRoute';
import FavouriteAnnouncements from '@/user/FavouriteAnnouncements';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="announcements/:id" element={<AnnouncementDetails />} />
          <Route path="news" element={<News />} />
          <Route path="about" element={<About />} />

          <Route path="auth">
            <Route path="user">
              <Route path="login" element={<UserLoginForm />} />
              <Route path="register" element={<UserRegisterForm />} />
            </Route>
          </Route>

          {/*Przekazywane jest redirectTo w Route tylko wtedy, gdy potrzeba zmienić domyślne przekierowanie w komponencie ProtectedRoute*/}
          <Route element={<ProtectedRoute />}>
            <Route path="favourites" element={<FavouriteAnnouncements />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
