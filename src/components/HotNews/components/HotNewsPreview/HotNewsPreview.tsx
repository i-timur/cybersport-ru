import {FC, useState} from 'react';
import {Link} from 'react-router-dom';

import './HotNewsPreview.scss';
import {Badge} from '../../../index';

interface Props {
  title: string;
  category: string;
  commentsCount: number;
  image: string;
}

const activeTitleClassNames = 'hot-news-preview__title hot-news-preview__title_active';
const notActiveTitleClassNames = 'hot-news-preview__title';

const HotNewsPreview: FC<Props> = ({title, category, commentsCount, image}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="hot-news-preview">
      <div
        className="hot-news-preview__container"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link
          to="/admin"
          className="hot-news-preview__link"
        >
          <div className="hot-news-preview__image">
            <img src={image} alt="preview" />
          </div>
        </Link>
        <div className="hot-news-preview__content">
          <div className="hot-news-preview__badge">
            <Badge to="#">
              {category}
            </Badge>
          </div>
          <div className="hot-news-preview__bottom">
            <p className={hovered ? activeTitleClassNames : notActiveTitleClassNames}>
              {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotNewsPreview;
