import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="announcements/:id" element={<AnnouncementDetails />} />
        <Route path="news" element={<News />} />
        <Route path="about" element={<About />} />

        <Route path="login" element={<UserLoginForm />} />
        <Route path="register" element={<UserRegisterForm />} />

        {/*Przekazywane jest prosp-redirectTo w Route tylko wtedy, gdy potrzeba zmienić domyślne przekierowanie w komponencie ProtectedRoute*/}
        <Route element={<ProtectedRoute />}>
          <Route path="favourites" element={<FavouriteAnnouncements />} />
          <Route
            path="favourites/:id"
            element={<AnnouncementDetails listType="favourites" />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
