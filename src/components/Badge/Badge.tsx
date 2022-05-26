import {CSSProperties, FC, PropsWithChildren} from 'react';
import {Link} from 'react-router-dom';

import './Badge.scss';

interface Props {
  to: string;
  bgColor?: string;
  textColor?: string;
}

const Badge: FC<PropsWithChildren<Props>> = ({to, bgColor, textColor, children}) => {
  return (
    <Link
      to={to}
      className="badge"
      style={{
        background: bgColor,
        color: textColor
      }}
    >
      {children}
    </Link>

  );
};

export default Badge;
