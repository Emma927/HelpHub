import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages
import Layout from '@/layout/Layout';
import Home from '@/pages/Home';
import Announcements from '@/pages/Announcements';
import AnnouncementDetails from '@/pages/AnnouncementDetails';
import News from '@/pages/News';
import Initiatives from '@/pages/Initiatives';
import About from '@/pages/About';
import ProtectedRoute from '@/user/ProtectedRoute.jsx'; //do rozważenia, czy jest potrzebna chroniona trasa
import NotFound from '@/pages/NotFound';
// User
import UserLogin from '@/user/UserLogin.jsx';
import UserRegister from '@/user/UserRegister.jsx';
import UserDashboard from '@/user/UserDashboard.jsx';
import FavoriteOffers from '@/user/FavoriteOffers.jsx';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="announcements/:id" element={<AnnouncementDetails />} />
          <Route path="news" element={<News />} />
          <Route path="initiatives" element={<Initiatives />} />
          <Route path="about" element={<About />} />

          {/* Ścieżki autoryzacji */}
          <Route path="auth">
            <Route path="user">
              <Route path="login" element={<UserLogin setUser={setUser} />} />
              <Route
                path="register"
                element={<UserRegister setUser={setUser} />}
              />
            </Route>
          </Route>

          {/* Panel użytkownika */}
          <Route
            element={
              <ProtectedRoute
                isLoggedIn={user?.type === 'user'}
                redirectTo="/auth/user/login"
              />
            }
          >
            <Route path="user">
              <Route index element={<UserDashboard />} />
              <Route path="ulubione" element={<FavoriteOffers />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
