import {createContext, FC, useEffect, useState} from 'react';

import {AuthContextValue} from '../../interfaces';
import {AuthService} from '../../services/authService';

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: FC = ({children}) => {
  const authService = new AuthService();

  const [auth, setAuth] = useState<boolean>(authService.isAuthenticated);

  useEffect(() => {
    setAuth(authService.isAuthenticated);
  }, [authService.isAuthenticated, auth]);

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
};
