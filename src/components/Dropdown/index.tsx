import {FC, MouseEvent, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import styles from './index.module.scss';

interface Props {
  title: string;
  ids: string[];
  data: string[];
}

export const Dropdown: FC<Props> = ({title, ids, data}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const onMouseEnter = (event: Event) => {
    event.stopPropagation();
    setVisible(true);
  };

  const onMouseLeave = (event: Event) => {
    // eslint-disable-next-line no-console
    console.log('Event target: ', event);
    event.stopPropagation();
    setVisible(false);
  };

  return (
    <div
      className={styles.dropdown}
      // @ts-ignore
      onMouseEnter={onMouseEnter}
      // @ts-ignore
      onMouseLeave={onMouseLeave}
    >
        <header className={styles.dropdown__title}>{title}</header>
        {visible && (
          <ul className={styles.dropdown__list}>
            {data.map((value, idx) => (
              <li key={ids[idx]} className={styles.dropdown__item}>
                <Link to={ids[idx]} className={styles.dropdown__link}>{value}</Link>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};
