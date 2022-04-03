import {FC} from 'react';
import {Route, Routes} from 'react-router-dom';

import MainLayout from './components/MainLayout/MainLayout';
import Home from './pages/Home/Home';
import Articles from './pages/Articles/Articles';
import Videos from './pages/Videos/Videos';

const App: FC = () => {
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
        </Route>
      </Routes>
  );
};

export default App;
