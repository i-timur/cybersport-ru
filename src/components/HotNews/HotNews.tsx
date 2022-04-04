import {FC} from 'react';
import {Link} from 'react-router-dom';

import {hf, elec, ww, fish, vert} from '../../assets/images';

import {HotNewsPreview} from './components/index';
import './HotNews.scss';

const hotNews = [
  {
    title: 'Entity стала чемпионом Winline Dota 2 Champions League Season 8',
    category: 'Статьи',
    commentsCount: 22,
    image: fish
  },
  {
    title: 'Впервые сыграл в оригинальную Half-Life — как культовый шутер Valve ощущается спустя 23 года после релиза',
    category: 'Статьи',
    commentsCount: 22,
    image: hf
  },
  {
    title: 'День рождения худшей карты в истории CS:GO — за что почти все ненавидят Vertigo',
    category: 'Статьи',
    commentsCount: 22,
    image: vert
  },
  {
    title: 'Матч дня: Astralis против Natus Vincere — в 20:30 мск',
    category: 'Статьи',
    commentsCount: 22,
    image: elec
  },
  {
    title: 'Обзор Weird West — безумный вестерн с оборотнями, ведьмами и привкусом Prey',
    category: 'Статьи',
    commentsCount: 22,
    image: ww
  }
];

const HotNews: FC = () => {

  return (
    <div className="hot-news">
      <div className="hot-news__container bg-secondary">
        <div className="hot-news__previews previews-hot-news">
          {hotNews.map((el, idx) =>
            <Link
              to="#"
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              className={`previews-hot-news__preview${idx}`}
            >
              <HotNewsPreview
                title={el.title}
                category={el.category}
                commentsCount={el.commentsCount}
                image={el.image}
              />
            </Link>)}
        </div>
      </div>
    </div>
  );
};

export default HotNews;
