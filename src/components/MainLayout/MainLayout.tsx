import {FC} from 'react';
import {Outlet} from 'react-router-dom';

import {Navbar, Footer} from './components/index';
import styles from './index.module.scss';

const MainLayout: FC = () => {
  return (
    <div className={styles.mainLayout}>
      <div className={styles.mainLayoutUpper}>
        <Navbar />
        <Outlet />
      </div>
      <div className={styles.mainLayoutFooter}>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
