import {FC, useState} from 'react';
import {Link} from 'react-router-dom';

import './HotNewsPreview.scss';
import {Badge, Icon} from '../../../index';
import {Option} from '../../../../utils';
import {Category} from '../../../../types';

interface Props {
  id: string;
  title: string;
  postType: Option;
  game: Category;
  commentsCount: number;
  image: string;
}

const activeTitleClassNames = 'hot-news-preview__title hot-news-preview__title_active';
const notActiveTitleClassNames = 'hot-news-preview__title';

const HotNewsPreview: FC<Props> = ({id, title, postType, game, commentsCount, image}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="hot-news-preview">
      <div
        className="hot-news-preview__container"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link
          to={`${postType.value}/${game.value}/${id}`}
          className="hot-news-preview__link"
        >
          <div className="hot-news-preview__image">
            <img src={image} alt="preview" />
          </div>
        </Link>
        <div className="hot-news-preview__content">
          <div className="hot-news-preview__badge">
            <Badge to={`/${postType.value}`}>
              {postType.label}
            </Badge>
          </div>
          <div className="hot-news-preview__bottom">
            <Link
              to={`${postType.value}/${game.value}/${id}`}
              className={hovered ? activeTitleClassNames : notActiveTitleClassNames}
            >
              {title}
            </Link>
            <div className={commentsCount > 5 ? 'hot-news-preview__comments hot-news-preview__comments_popular' : 'hot-news-preview__comments'}>
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
      </div>
    </div>
  );
};

export default HotNewsPreview;
