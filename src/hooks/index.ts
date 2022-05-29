import {MutableRefObject, useContext, useEffect} from 'react';

import {AuthContext} from '../contexts/AuthProvider';
import {StoreContext} from '../contexts/StoreProvider';

export const useStores = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('Did not find any store context');
  }
  return store;
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('Did not find auth context');
  }
  return auth;
};

export const useModalClose = (ref: MutableRefObject<HTMLElement | undefined>, handler: () => void) => {
  useEffect(() => {
    const reference = ref.current;

    const listener = (event: Event) => {
      if (reference === event.target) {
        handler();
      }
    };
    reference?.addEventListener('mousedown', listener);

    return () => reference?.removeEventListener('mousedown', listener);
  }, [ref, handler]);
};
