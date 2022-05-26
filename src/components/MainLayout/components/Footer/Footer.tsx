import {FC} from 'react';
import {Link} from 'react-router-dom';

import './Footer.scss';

const Footer: FC = () => {
  return (
    <div className="footer">
      <div className="footer__container container">
        <div className="footer__left">
          <div className="footer__text">
            <p className="footer__owner">© Ibragimov Timur — All Rights Reserved.</p>
            <div className="footer__links">
              <Link
                to="#"
                className="footer__link"
              >
                Правила пользования сайтом
              </Link>
              <span>|</span>
              <Link
                to="#"
                className="footer__link"
              >
                О нас
              </Link>
            </div>
          </div>
          <div className="footer__constraint">18+</div>
        </div>
        <div className="footer__right">
          <p>Нашли ошибку в материале?</p>
          <p>Выделите ее и нажмите Ctrl+Enter</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
