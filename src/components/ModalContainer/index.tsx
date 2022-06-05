import {FC, useRef} from 'react';
import {observer} from 'mobx-react-lite';

import {useModalClose, useStores} from '../../hooks';
import {Portal} from '../Portal';

import styles from './index.module.scss';

export const ModalContainer: FC = observer(({children}) => {
  const {store: {modalStore: {clearCurrentModal}}} = useStores();

  const ref = useRef();

  useModalClose(ref, () => clearCurrentModal());

  return (
    <Portal>
      <div
        className={styles.overlay}
        // @ts-ignore
        ref={ref}
      >
        {children}
      </div>
    </Portal>
  );
});
