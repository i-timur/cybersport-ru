import {FC} from 'react';
import {Link} from 'react-router-dom';
import {formatDistance} from 'date-fns';
import {ru} from 'date-fns/locale';

import {Badge, Icon} from '../index';
import {Post} from '../../interfaces';
import './HomeCard.scss';

interface Props {
  post: Post;
}

export const HomeCard: FC<Props> = ({post}) => {
  return (
    <div className="home-card">
      <div className="home-card__container">
        <Link
          to={`/${post.postType.value}/${post.game.value}/${post.id}`}
          className="home-card__image"
        >
            <img src={post.previewLink} alt="card" />
        </Link>
        <div className="home-card__text">
          <div className="home-card__upper">
            <div className="home-card__badge">
              <Badge
                to={`/${post.postType.value}`}
                bgColor="#FFFFFF"
                textColor="#000000"
              >
                {post.postType.label}
              </Badge>
            </div>
            <Link
              to={`/${post.postType.value}/${post.game.value}/${post.id}`}
              className="home-card__title"
            >{post.title}</Link>
          </div>
          <div className="home-card__info">
            <p className="home-card__date">{formatDistance(new Date(post.date), new Date(), {locale: ru})} назад</p>
            <div className={post.comments.length > 5 ? 'home-card__comments home-card__comments_popular' : 'home-card__comments'}>
              {post.comments.length > 5 ? (
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
              &nbsp;{post.comments.length || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
