import {FC, PropsWithChildren} from 'react';

import styles from './index.module.scss';

interface Props {
  onClick: () => void;
}
export const Btn: FC<PropsWithChildren<Props>> = ({children, onClick}) => {
  return (
    <button
      type="button"
      className={styles.btn}
      onClick={onClick}
    >{children}</button>
  );
};
