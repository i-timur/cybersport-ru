import {FC} from 'react';
import {Link} from 'react-router-dom';

import {CardImage} from '../../../../assets/images';
import {Badge, Icon} from '../../../../components';
import './HomeCard.scss';

const HomeCard: FC = () => {
  return (
    <div className="home-card">
      <div className="home-card__container">
        <Link
          to="#"
          className="home-card__image"
        >
            <img src={CardImage} alt="card" />
        </Link>
        <div className="home-card__text">
          <div className="home-card__badge">
            <Badge
              to="#"
              bgColor="#FFFFFF"
              textColor="#000000"
            >
              Тесты
            </Badge>
          </div>
          <Link
            to="#"
            className="home-card__title"
          >Лучшие фанатские фильмы по «Гарри Поттеру»</Link>
          <div className="home-card__info">
            <p className="home-card__date">20 часов назад</p>
            <div className="home-card__comments">
              <Icon
                name="comment"
                color="#8A8A8A"
              />
              15
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
