import {FC, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';
import {OutputData} from '@editorjs/editorjs';

import {http} from '../../client';
import {IComment, Post, PostsResp} from '../../types';
import {comparePosts} from '../../utils';
import {Editor, NewsItem, Comment} from '../../components';

import styles from './index.module.scss';

const comments: IComment[] = [
  {
    id: '0',
    authorId: 'dadsadsadasdas',
    authorName: 'Agent',
    date: new Date().toLocaleDateString(),
    text: 'выиграли рофлолан (тсм проиграли сами себе) и радуются.'
  },
  {
    id: '1',
    authorId: 'ds',
    authorName: 'Robot',
    date: new Date().toLocaleDateString(),
    text: 'выиграли рофлолан (тсм проиграли сами себе) и радуются.'
  },
  {
    id: '2',
    authorId: 'qq',
    authorName: 'Bear',
    date: new Date().toLocaleDateString(),
    text: 'выиграли рофлолан (тсм проиграли сами себе) и радуются.'
  },
];

export const PostComponent: FC = () => {
  const {id} = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [lastNews, setLastNews] = useState<Post[] | null>(null);

  useEffect(() => {
    http.get(`posts/${id}.json`)
      .then((res: any) => {
        setPost(res);
      })
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    if (post) {
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
            .sort(comparePosts)
            .filter((el: Post) => el.game.value === post.game.value)
            .filter((el: Post) => el.id !== id);

          setLastNews(posts.slice(0, 5));
        })
        .catch(() => {
        });
    }
  }, [post]);

  return (
    <div className={styles.post}>
      <div className={`${styles.postContainer} container`}>
        <div className={styles.postMain}>
          <div className={styles.postLeft}>
            <div className={styles.leftContainer}>
              <h6 className={styles.leftHeader}>Новости</h6>
              <div className={styles.leftPosts}>
                {lastNews && (
                  lastNews.map(({id, game, date, title, commentsCount}) => (
                    <div className={styles.leftPost} key={id}>
                      <NewsItem
                        id={id ?? '-1'}
                        game={game}
                        title={title}
                        date={`${format(new Date(date), 'd LLLL HH:mm', {locale: ru})}`}
                        commentsCount={commentsCount}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className={styles.postRight}>
            <div className={styles.rightContainer}>
              <Link
                to={`/${post?.game.value}`}
                className={styles.rightGame}
              >{post?.game.name}</Link>
              <h1 className={styles.rightTitle}>{post?.title}</h1>
              <p className={styles.rightDate}>{post && format(new Date(post.date), 'd.L.y, H:m')}</p>
              <div className={styles.rightText}>
                {post && (
                  <Editor
                    editable={false}
                    defaultInitialData={post.data}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.postComments}>
          <div className={styles.commentsContainer}>
            <h4 className={styles.commentsTitle}>Комментарии</h4>
            <div className={styles.commentsComments}>
              {comments.map((comment) => (
                <div className={styles.commentsComment} key={comment.authorId}>
                  <Comment />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
