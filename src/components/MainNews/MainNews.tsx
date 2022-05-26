import {FC, useEffect, useState} from 'react';
import {format} from 'date-fns';

import {http} from '../../client';
import {Post, PostsResp} from '../../types';
import {comparePosts} from '../../utils';

import {NewsItem} from './components/index';

import './MainNews.scss';


const MainNews: FC = () => {
  const [news, setNews] = useState<Post[] | null>(null);

  useEffect(() => {
    http.get('posts.json')
      .then((res) => {
        const posts: Post[] = Object.keys(res as unknown as PostsResp)
          .map((key) => {
            return {
              id: key,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              ...res[key]
            };
          })
          .sort(comparePosts);

        setNews(posts);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="main-news">
      <div className="main-news__container">
        <h6 className="main-news__title">Новости</h6>
        <h6 className="main-news__subtitle">2 апреля</h6>
        <div className="main-news__content">
          {news?.map(({id, game, title, date, commentsCount}) =>
            <div className="main-news__item" key={id}>
              <NewsItem
                id={id ?? 'No such index'}
                game={game}
                title={title}
                date={`${format(new Date(date), 'HH:mm')}`}
                commentsCount={commentsCount}
              />
            </div>)}
        </div>
      </div>
    </div>
  );
};

export default MainNews;
