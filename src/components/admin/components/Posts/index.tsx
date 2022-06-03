import {FC, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {http} from '../../../../client';
import {Post, PostsResp} from '../../../../interfaces';
import {comparePosts} from '../../../../utils';

import styles from './index.module.scss';

export const Posts: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    http.get(`${process.env.REACT_APP_DB_URL}/posts.json`)
      .then((res) => {
        const posts: Post[] = Object.keys(res as unknown as PostsResp)
          .map((key) => {
            return {
              id: key,
              // @ts-ignore
              ...res[key]
            };
          })
          .sort(comparePosts);

        setPosts(posts);
      })
      .catch(() => {});
  }, []);

  return (
    <div className={styles.posts}>
      <div className={`${styles.posts__container} container`}>
        <ul className={styles.posts__list}>
          {posts.map((post) => (
            <li key={post.id} className={`${styles.posts__item} ${styles.post}`}>
              <Link to={`/admin/post/${post.id}`} className={styles.post__link}>
                <div className={styles.post__left}>
                  {post.title}
                </div>
                <div className={styles.post__right}>
                  <p>
                    Игра: {post.game.name}
                  </p>
                  <p>
                    Дата публикации:&nbsp;
                    {new Date(post.date).toLocaleString()}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
