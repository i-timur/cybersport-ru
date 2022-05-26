import {Link} from 'react-router-dom';

import {logo} from '../../../../../../assets/images';
import './index.scss';
import {useAuth} from '../../../../../../hooks';

export const Navbar = () => {
  const {auth} = useAuth();

  return (
    <div className="admin-navbar">
      <div className="admin-navbar__container container">
        <div>
          <Link to="/"><img src={logo} alt="logo" /></Link>
        </div>
        <nav>
          {auth && (
            <ul className="admin-navbar__list">
              <li>
                <Link to="/admin/dashboard" className="admin-navbar__link">
                  Меню
                </Link>
              </li>

              <li className="admin-navbar__item">
                <Link to="/admin/logout" className="admin-navbar__link">
                  Выйти
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
};
