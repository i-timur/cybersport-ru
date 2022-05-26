import {FC} from 'react';
import {Outlet} from 'react-router-dom';

import {Navbar} from './components';

export const AdminLayout: FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
