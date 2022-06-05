import {FC, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {observer} from 'mobx-react-lite';

import {logo, NoAvatar} from '../../../../assets/images';
import {Icon} from '../../../index';
import {useAuth, useStores} from '../../../../hooks';
import {ModalSignIn} from '../../../Modals';
import {AuthService} from '../../../../services/authService';
import {Dropdown} from '../../../Dropdown';
import {categoryOptions, postOptions} from '../../../../utils';
import './Navbar.scss';

const Navbar: FC = observer(() => {
  const {store: {modalStore: {setCurrentModal}}} = useStores();

  const {auth} = useAuth();

  return (
    <div className="navbar bg-primary">
      <div className="navbar__container container">
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
                <Dropdown
                  title="Новости"
                  ids={postOptions.map((cat) => cat.value)}
                  data={postOptions.map((cat) => cat.label)}
                  width="150px"
                />
              </li>
              <li className="right-navbar__nav-item">
                <Dropdown
                  title="Игры"
                  ids={categoryOptions.map((cat) => `games/${cat.value}`)}
                  data={categoryOptions.map((cat) => cat.name)}
                  icons={categoryOptions.map((cat) => cat.img!)}
                  width="180px"
                />
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

            {auth ? (
              <div className="right-navbar__user-img">
                <img src={NoAvatar} alt="Ваш профиль" />
              </div>
            ) : (
              <div className="right-navbar__login-btn">
                <button
                  type="button"
                  className="bg-primary"
                  onClick={() => setCurrentModal(<ModalSignIn />)}
                >
                <span>Войти</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Navbar;
