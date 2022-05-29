import {FC} from 'react';
import {format} from 'date-fns';

import {Post} from '../../types';

import {NewsItem} from './components/index';

import './MainNews.scss';

interface Props {
  posts: Post[];
}

const MainNews: FC<Props> = ({posts}) => {
  return (
    <div className="main-news">
      <div className="main-news__container">
        <h6 className="main-news__title">Новости</h6>
        <h6 className="main-news__subtitle">2 апреля</h6>
        <div className="main-news__content">
          {posts.map(({id, game, title, date, comments}) =>
            <div className="main-news__item" key={id}>
              <NewsItem
                id={id ?? 'not_existing_index'}
                game={game}
                title={title}
                date={`${format(new Date(date), 'HH:mm')}`}
                commentsCount={comments.length}
              />
            </div>)}
        </div>
      </div>
    </div>
  );
};

export default MainNews;
