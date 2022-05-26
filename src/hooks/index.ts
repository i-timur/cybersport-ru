import {useContext} from 'react';

import {StoreContext} from '../utils';
import {AuthContext} from '../contexts/AuthProvider';
import {AuthContextValue} from '../types';

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
