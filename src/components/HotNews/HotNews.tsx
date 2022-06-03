import {FC} from 'react';

import {Post} from '../../interfaces';

import {HotNewsPreview} from './components/index';

import './HotNews.scss';

interface Props {
  posts: Post[];
}

const HotNews: FC<Props> = ({posts}) => {
  return (
    <div className="hot-news bg-secondary">
      <div className="hot-news__container bg-secondary container">
        <div className="hot-news__previews previews-hot-news">
          {posts.map((el, idx) =>
            <div
              key={el.id}
              className={`previews-hot-news__preview${idx}`}
            >
              <HotNewsPreview
                id={el.id ?? 'not_existing_index'}
                title={el.title}
                postType={el.postType}
                game={el.game}
                commentsCount={el.comments.length}
                image={el.previewLink}
              />
            </div>)}
        </div>
      </div>
    </div>
  );
};

export default HotNews;
