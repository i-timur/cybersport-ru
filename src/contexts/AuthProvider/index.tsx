import {createContext, FC, useEffect, useState} from 'react';

import {AuthContextValue} from '../../types';
import {AuthService} from '../../services/authService';

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: FC = ({children}) => {
  const authService = new AuthService();

  const [auth, setAuth] = useState(authService.isAuthenticated);

  useEffect(() => {
    setAuth(authService.isAuthenticated);
  }, [authService.isAuthenticated]);

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
};
