import {FC} from 'react';
import {Link} from 'react-router-dom';

import {Icon} from '../../../index';
import './NewsItem.scss';
import {getCategoryImage} from '../../../../utils';
import {Category} from '../../../../types';

interface Props {
  id: string;
  game: Category;
  title: string;
  date: string;
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
        <p className="item-main-news__time">{date}</p>
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
