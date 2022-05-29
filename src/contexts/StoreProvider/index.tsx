import {createContext, FC} from 'react';

import {MainStore, mainStore} from '../../stores/mainStore';

export const StoreContext = createContext<MainStore | null>(null);

export const StoreProvider: FC = ({children}) => {
  return (
    <StoreContext.Provider value={mainStore}>
      {children}
    </StoreContext.Provider>
  );
};
