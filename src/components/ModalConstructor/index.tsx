import {FC, cloneElement} from 'react';
import {observer} from 'mobx-react-lite';

import {useStores} from '../../hooks';

export const ModalConstructor: FC = observer(() => {
  const {store: {modalStore: {currentModal}}} = useStores();

  if (currentModal) {
    return cloneElement(currentModal);
  } else {
    return null;
  }
});
