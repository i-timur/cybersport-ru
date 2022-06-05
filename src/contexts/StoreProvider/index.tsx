import {createContext, Dispatch, FC, useEffect, useState} from 'react';

import {MainStore, mainStore} from '../../stores/mainStore';

interface StoreObj {
  store: MainStore;
  setRefreshStore: Dispatch<boolean>;
}

export const StoreContext = createContext<StoreObj | null>(null);

export const StoreProvider: FC = ({children}) => {
  const [store, setStore] = useState(new MainStore());
  const [refreshStore, setRefreshStore] = useState(false);

  useEffect(() => {
    if (refreshStore) {
      setStore(new MainStore());
      setRefreshStore(false);
    }
  }, [refreshStore]);

  return (
    <StoreContext.Provider value={{store, setRefreshStore}}>
      {children}
    </StoreContext.Provider>
  );
};
