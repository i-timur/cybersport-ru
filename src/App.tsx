import {FC} from 'react';
import {Route, Routes} from 'react-router-dom';

import {Articles, Home, Videos} from './pages';
import {MainLayout, PrivateRoute, AdminLayout, CreatePost, Dashboard, Login, Logout, Navigate, Posts} from './components';
import {useAuth} from './hooks';
import {PostComponent} from './pages/Post';

const App: FC = () => {
  const {auth} = useAuth();

  return (
      <Routes>
        <Route path="/*" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="articles" element={<Articles />} />
          <Route path="interviews" element={<Articles />} />
          <Route path="videos" element={<Videos />} />
          <Route path="business" element={<Articles />} />
          <Route path="education" element={<Articles />} />
          <Route path="gaming-clubs" element={<Articles />} />
          <Route path=":category/news/:id" element={<PostComponent />} />
        </Route>
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route
            path="login"
            element={
              <PrivateRoute isAllowed={!auth} redirectTo="/admin/dashboard">
                <Login />
              </PrivateRoute>
            }
          />
          <Route path="logout" element={<Logout />} />
          <Route element={<PrivateRoute isAllowed={auth} redirectTo="/admin/login" />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="create" element={<CreatePost />} />
            <Route path="posts" element={<Posts />} />
          </Route>
          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
        </Route>
      </Routes>
  );
};

export default App;
