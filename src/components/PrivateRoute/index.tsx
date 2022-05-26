import {FC, PropsWithChildren} from 'react';
import {Outlet} from 'react-router-dom';
import {observer} from 'mobx-react-lite';

import {Navigate} from '../Navigate';

interface Props {
  isAllowed: boolean;
  redirectTo?: string;
}

export const PrivateRoute: FC<PropsWithChildren<Props>> = observer(({children, isAllowed, redirectTo = '/'}) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
});
