import {FC} from 'react';
import {Route, Routes} from 'react-router-dom';

import {Articles, Home, Videos} from './pages';
import {MainLayout} from './components';

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
