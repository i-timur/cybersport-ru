import {FC} from 'react';

import {HomeCard} from '../index';
import {Post} from '../../interfaces';

import styles from './index.module.scss';

interface Props {
  posts: Post[];
}

export const HomeCards: FC<Props> = ({posts}) => {
  return (
    <div className={styles.homeCards}>
      {posts.map((post) => (
        <div key={post.id} className={styles.homeCards__card}>
          <HomeCard post={post} />
        </div>
      ))}
    </div>
  );
};
