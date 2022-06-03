import {FC} from 'react';

import {Category} from '../../interfaces';

import styles from './index.module.scss';

interface Props {
  title: string;
  game: Category;
  date: Date;
  commentsCount: number;
}

export const ArticleCard: FC = () => {
  return (
    <div>
      Article Card
    </div>
  );
};
