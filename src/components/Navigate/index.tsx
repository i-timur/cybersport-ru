import {FC, useEffect} from 'react';
import {NavigateProps, useNavigate} from 'react-router-dom';

export const Navigate: FC<NavigateProps> = ({to, replace, state}) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to, {replace, state});
  }, [navigate, to, replace, state]);

  return null;
};
