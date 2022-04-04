import {FC} from 'react';
import {Outlet} from 'react-router-dom';

import {Navbar, Footer} from './components/index';

const MainLayout: FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
