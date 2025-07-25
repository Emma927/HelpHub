import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//Strony
import Layout from '@/layout/Layout';
import Home from '@/pages/Home';
import Announcements from '@/pages/Announcements';
import News from '@/pages/News';
import Initiatives from '@/pages/Initiatives';
import About from '@/pages/About';
import ProtectedRoute from '@/components/ProtectedRoute'; //do rozważenia, czy jest potrzebna chroniona trasa
import NotFound from '@/pages/NotFound';
//Panel użytkownika
import UserLogin from '@/pages/auth/UserLogin';
import UserRegister from '@/pages/auth/UserRegister';
import UserDashboard from '@/pages/dashboards/UserDashboard';
import FavoriteOffers from '@/pages/user/FavoriteOffers';
//Panel organizacji - do rozważenia czy uda się zrobić panel organizacji
import OrganizationLogin from '@/pages/auth/OrganizationLogin';
import OrganizationRegister from '@/pages/auth/OrganizationRegister';
import OrganizationDashboard from '@/pages/dashboards/OrganizationDashboard';
import OrganizationAnnouncements from '@/pages/organization/OrganizationAnnouncements';

function App() {

    const [user, setUser] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="announcements" element={<Announcements/>}/>
                    <Route path="news" element={<News/>}/>
                    <Route path="initiatives" element={<Initiatives/>}/>
                    <Route path="about" element={<About/>}/>

                    {/* Ścieżki autoryzacji */}
                    <Route path="auth">
                        <Route path="user">
                            <Route path="login" element={<UserLogin setUser={setUser}/>}/>
                            <Route path="register" element={<UserRegister setUser={setUser}/>}/>
                        </Route>
                        <Route path="organization">
                            <Route path="login" element={<OrganizationLogin setUser={setUser}/>}/>
                            <Route path="register" element={<OrganizationRegister setUser={setUser}/>}/>
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
                            <Route index element={<UserDashboard/>}/>
                            <Route path="ulubione" element={<FavoriteOffers/>}/>
                        </Route>
                    </Route>

                    {/* Panel organizacji */}
                    <Route
                        element={
                            <ProtectedRoute
                                isLoggedIn={user?.type === 'organization'}
                                redirectTo="/auth/organization/login"
                            />
                        }
                    >
                        <Route path="organization">
                            <Route index element={<OrganizationDashboard/>}/>
                            <Route path="ogloszenia" element={<OrganizationAnnouncements/>}/>
                        </Route>
                    </Route>

                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;