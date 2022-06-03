import {FC} from 'react';
import {Link} from 'react-router-dom';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';

import {Icon} from '../../../index';
import './NewsItem.scss';
import {getCategoryImage} from '../../../../utils';
import {Category} from '../../../../interfaces';

interface Props {
  id: string;
  game: Category;
  title: string;
  date: Date;
  img?: string;
  commentsCount: number;
}

const NewsItem: FC<Props> = ({id, game, title, date, img, commentsCount}) => {
  return (
    <Link
      to={`/${game.value}/news/${id}`}
      className="item-main-news"
    >
      <div className="item-main-news__image">
        <img src={getCategoryImage(game.value)} alt="Картинка игры" />
      </div>
      <div className="item-main-news__text">
        <p className="item-main-news__time">{format(new Date(date), 'HH:mm', {locale: ru})}</p>
        <div className="item-main-news__title">
          {title}
          <div className={commentsCount > 5 ? 'item-main-news__comment item-main-news__comment_popular' : 'item-main-news__comment'}>
            {commentsCount > 5 ? (
              <Icon
                name="fire"
                color="#FF6F22"
              />
            ) : (
              <Icon
                name="comment"
                color="#8A8A8A"
              />
            )}
            &nbsp;{commentsCount || 0}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsItem;
