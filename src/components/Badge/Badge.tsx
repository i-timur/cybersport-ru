import {FC, PropsWithChildren} from 'react';
import {Link} from 'react-router-dom';

import './Badge.scss';

interface Props {
  to: string;
}

const Badge: FC<PropsWithChildren<Props>> = ({to, children}) => {
  return (
    <Link
      to={to}
      className="badge"
    >
      {children}
    </Link>

  );
};

export default Badge;
