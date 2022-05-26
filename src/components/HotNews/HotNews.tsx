import {FC} from 'react';
import {Link} from 'react-router-dom';

import {hf, elec, ww, fish, vert} from '../../assets/images';

import {HotNewsPreview} from './components/index';
import './HotNews.scss';

const hotNews = [
  {
    id: 0,
    title: 'Entity стала чемпионом Winline Dota 2 Champions League Season 8',
    category: 'Статьи',
    commentsCount: 22,
    image: fish
  },
  {
    id: 1,
    title: 'Впервые сыграл в оригинальную Half-Life — как культовый шутер Valve ощущается спустя 23 года после релиза',
    category: 'Статьи',
    commentsCount: 22,
    image: hf
  },
  {
    id: 2,
    title: 'День рождения худшей карты в истории CS:GO — за что почти все ненавидят Vertigo',
    category: 'Статьи',
    commentsCount: 22,
    image: vert
  },
  {
    id: 3,
    title: 'Матч дня: Astralis против Natus Vincere — в 20:30 мск',
    category: 'Статьи',
    commentsCount: 22,
    image: elec
  },
  {
    id: 4,
    title: 'Обзор Weird West — безумный вестерн с оборотнями, ведьмами и привкусом Prey',
    category: 'Статьи',
    commentsCount: 22,
    image: ww
  },
];

const HotNews: FC = () => {
  return (
    <div className="hot-news bg-secondary">
      <div className="hot-news__container bg-secondary container">
        <div className="hot-news__previews previews-hot-news">
          {hotNews.map((el, idx) =>
            <div
              key={el.id}
              className={`previews-hot-news__preview${idx}`}
            >
              <HotNewsPreview
                title={el.title}
                category={el.category}
                commentsCount={el.commentsCount}
                image={el.image}
              />
            </div>)}
        </div>
      </div>
    </div>
  );
};

export default HotNews;
