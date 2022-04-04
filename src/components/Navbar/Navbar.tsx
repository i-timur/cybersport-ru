import {FC} from 'react';
import {Link} from 'react-router-dom';

import {logo} from '../../assets/images/index';
import './Navbar.scss';

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
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 10C10.5369 13.5754 10.9873 15.4892 14.5 19.5H15V10H20V18.5H22C23.7668 15.6686 24.7547 13.9831 26.5 10H30.5V12.5L27 18.5V20L31.5 24.5V27H27.5L22.5 22H20V26.5H14.5C8.83308 22.4329 6.54021 19.1621 4 11.5V10H9Z" fill="white" />
                  </svg>

                </li>
              </Link>
              <Link
                to="#"
                className="right-navbar__contact-link"
              >
                <li className="right-navbar__contacts-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 11L6 14L19.5 6L9 15V20.5L12.5 17.5L18.5 22H19.5L23.5 2.5L0 11Z" fill="white" />
                  </svg>
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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="9" stroke="white" stroke-width="2" />
                    <ellipse cx="6.85977" cy="6.97476" rx="1.09669" ry="1.64504" transform="rotate(36.4708 6.85977 6.97476)" fill="white" />
                    <ellipse cx="17.7392" cy="19.2927" rx="4" ry="1" transform="rotate(38.9589 17.7392 19.2927)" fill="white" />
                  </svg>
                </li>
              </Link>
              <Link
                to="#"
                className="right-navbar__contact-link"
              >
                <li className="right-navbar__contacts-item right-navbar__contacts-theme">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.3807 1.06204C11.2777 2.32108 11.2389 3.91075 11.3728 5.51068C11.5503 7.63107 12.0459 9.97929 13.2868 11.5331C14.6229 13.2062 16.8947 13.6712 18.8844 13.7089C20.3116 13.736 21.7495 13.5471 22.9278 13.2993C22.3127 18.7931 17.845 23 12.5 23C6.74069 23 2 18.1157 2 12C2 6.28556 6.13905 1.64619 11.3807 1.06204Z" stroke="white" stroke-width="2" />
                  </svg>
                </li>
              </Link>
            </ul>

            <div className="right-navbar__login-btn">
              <button
                type="button"
                className="bg-primary"
              >
                Войти
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
