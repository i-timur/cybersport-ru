import {FC, useEffect} from 'react';
import {Navigate} from 'react-router-dom';

import {AuthService} from '../../../../services/authService';
import {useAuth} from '../../../../hooks';

export const Logout: FC = () => {
  const {setAuth} = useAuth();

  const authService = new AuthService();

  authService.logout();

  useEffect(() => {
    setAuth(false);
  }, [setAuth]);

  return <Navigate to="/admin/login" />;
};
