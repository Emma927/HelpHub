import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages
import Layout from '@/layout/Layout';
import Home from '@/pages/Home';
import Announcements from '@/pages/Announcements';
import AnnouncementDetails from '@/pages/AnnouncementDetails';
import News from '@/pages/News';
import About from '@/pages/About';
import ProtectedRoute from '@/user/ProtectedRoute';
import NotFound from '@/pages/NotFound';
// User
import UserLoginForm from '@/user/UserLoginForm';
import UserRegisterForm from '@/user/UserRegisterForm';
import FavouriteOffers from '@/user/FavouriteOffers';
import React from 'react';

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

          <Route element={<ProtectedRoute />}>
            <Route path="favourites" element={<FavouriteOffers />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
