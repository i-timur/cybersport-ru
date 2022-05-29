import {FC, Fragment} from 'react';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';

import {Post} from '../../types';

import {NewsItem} from './components/index';

import './MainNews.scss';

interface Props {
  posts: Post[];
}

const MainNews: FC<Props> = ({posts}) => {
  const formattedPosts = posts.map((post) => {
    return {
      ...post,
      date: new Date(post.date).toISOString().slice(0, 10)
    };
  });
  const sortedPostsByDate: {[key: string]: Post[];} = {};
  for (const post of formattedPosts) {
    if (post.date in sortedPostsByDate) {
      sortedPostsByDate[post.date].push({...post, date: new Date(post.date)});
    } else {
      sortedPostsByDate[post.date] = [{...post, date: new Date(post.date)}];
    }
  }
  return (
    <div className="main-news">
      <div className="main-news__container">
        <h6 className="main-news__title">Новости</h6>
        {Object.keys(sortedPostsByDate).map((date) => (
          <Fragment key={date}>
            <h6 className="main-news__subtitle">{format(new Date(date), 'd MMMM', {locale: ru})}</h6>
            <div className="main-news__content">
              {sortedPostsByDate[date].map(({id, game, title, date, comments}) =>
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
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default MainNews;
