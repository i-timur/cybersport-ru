import {FC} from 'react';
import {Outlet} from 'react-router-dom';

import {Navbar, Footer} from '../index';

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
