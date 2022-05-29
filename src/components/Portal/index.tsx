import {FC, PropsWithChildren, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

interface Props {
  className: string;
  el: string;
  role: string;
}

export const Portal: FC<PropsWithChildren<Partial<Props>>> = ({className = 'portal-root', el = 'div', role, children}) => {
  const [container] = useState(document.createElement(el));

  container.classList.add(className as string);

  if (role) {
    container.setAttribute('role', role);
  }

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return ReactDOM.createPortal(children, container);
};
