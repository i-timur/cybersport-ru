import {FC} from 'react';
import {Link} from 'react-router-dom';

import styles from './index.module.scss';

export const Dashboard: FC = () => {
  return (
    <div className={styles.dashboard}>
      <div className={`${styles.dashboard__container} container`}>
        <div className={styles.dashboard__menu}>
          <Link
            to="/admin/create"
            className={styles.dashboard__link}
          >Создать новый пост</Link>

          <Link
            to="/admin/posts"
            className={styles.dashboard__link}
          >Посмотреть все посты</Link>

          <Link
            to="/admin/users"
            className={styles.dashboard__link}
          >Посмотреть всех пользовователей</Link>
        </div>
      </div>
    </div>
  );
};
