import {FC} from 'react';
import {Link} from 'react-router-dom';

import {logo} from '../../../../assets/images';
import './Navbar.scss';
import {Icon} from '../../../index';

const Navbar: FC = () => {
  return (
    <div className="navbar">
      <div className="navbar__container">
        <Link
          to="/"
          className="navbar__logo logo-navbar bg-secondary"
        >
          <div className="logo-navbar__image">
            <img src={logo} alt="logo" />
          </div>
          <div className="logo-navbar__background-angle bg-primary" />
        </Link>

        <div className="navbar__right right-navbar bg-primary">
          <nav className="right-navbar__navigation">
            <ul className="right-navbar__nav-list">
              <li className="right-navbar__nav-item">
                <p className="right-navbar__nav-link">
                  Новости
                </p>
              </li>
              <li className="right-navbar__nav-item">
                <p className="right-navbar__nav-link">
                  Игры
                </p>
              </li>
              <li className="right-navbar__nav-item">
                <p className="right-navbar__nav-link">
                  Статистика
                </p>
              </li>
              <li className="right-navbar__nav-item">
                <Link
                  to="#"
                  className="right-navbar__nav-link"
                >
                  Ставки
                </Link>
              </li>
              <li className="right-navbar__nav-item">
                <Link
                  to="#"
                  className="right-navbar__nav-link"
                >
                  Блоги
                </Link>
              </li>
            </ul>
          </nav>

          <div className="right-navbar__contacts">
            <ul className="right-navbar__contacts-list">
              <Link
                to="#"
                className="right-navbar__contact-link"
              >
                <li className="right-navbar__contacts-item">
                  <Icon
                    name="vk"
                    size={36}
                    color="#FFFFFF"
                    hoverColor="#FFC7AD"
                  />
                </li>
              </Link>
              <Link
                to="#"
                className="right-navbar__contact-link"
              >
                <li className="right-navbar__contacts-item">
                  <Icon
                    name="tg"
                    size={24}
                    color="#FFFFFF"
                    hoverColor="#FFC7AD"
                  />
                </li>
              </Link>
            </ul>
            <div className="right-navbar__divider" />
            <ul className="right-navbar__contacts-list">
              <Link
                to="#"
                className="right-navbar__contact-link"
              >
                <li className="right-navbar__contacts-item">
                  <Icon
                    name="search"
                    size={24}
                    color="#FFFFFF"
                    hoverColor="#FFC7AD"
                  />
                </li>
              </Link>
              <Link
                to="#"
                className="right-navbar__contact-link"
              >
                <li className="right-navbar__contacts-item right-navbar__contacts-theme">
                  <Icon
                    name="theme"
                    size={24}
                    color="#FFFFFF"
                    hoverColor="#FFC7AD"
                  />
                </li>
              </Link>
            </ul>

            <div className="right-navbar__login-btn">
              <button
                type="button"
                className="bg-primary"
              >
                <span>Войти</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
