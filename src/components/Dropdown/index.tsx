import {FC, MouseEvent, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import styles from './index.module.scss';

interface Props {
  title: string;
  ids: string[];
  data: string[];
  icons?: string[];
  width?: string;
}

export const Dropdown: FC<Props> = ({title, ids, data, icons, width}) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div
      className={styles.dropdown}
      // @ts-ignore
      onMouseEnter={() => setVisible(true)}
      // @ts-ignore
      onMouseLeave={() => setVisible(false)}
    >
        <header
          className={visible ? `${styles.dropdown__title} ${styles.dropdown__title_hovered}` : styles.dropdown__title}
        >{title}</header>
        {visible && (
          <ul className={styles.dropdown__list} style={{width}}>
            {data.map((value, idx) => (
              <li key={ids[idx]} className={styles.dropdown__item}>
                <Link to={ids[idx]} className={styles.dropdown__link}>
                  {icons && <img src={icons[idx]} alt={value} />}
                  {value}
                </Link>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};
