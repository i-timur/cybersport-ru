import {FC, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';
// @ts-ignore
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';

import {http} from '../../client';
import {Post} from '../../types';
import {compareCommentsByDateAsc, compareCommentsByLikesDesc, comparePosts, makeArrayOf} from '../../utils';
import {Editor, NewsItem, Comment} from '../../components';

import styles from './index.module.scss';

export const PostComponent: FC = () => {
  const {id} = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [lastNews, setLastNews] = useState<Post[] | null>(null);

  useEffect(() => {
    http.get(`posts/${id}.json`)
      .then((res: any) => {
        setPost({...res, comments: makeArrayOf(res.comments)});
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, [id]);

  useEffect(() => {
    if (post) {
      http.get('posts.json')
        .then((res: any) => {
          const posts: Post[] = makeArrayOf(res)
            .map((post) => {
              return {
                ...post,
                comments: makeArrayOf(post.comments)
              };
            })
            .sort(comparePosts)
            .filter((el: Post) => el.game.value === post.game.value)
            .filter((el: Post) => el.postType.value === 'news')
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
                  lastNews.map(({id, game, date, title, comments}) => (
                    <div className={styles.leftPost} key={id}>
                      <NewsItem
                        id={id ?? '-1'}
                        game={game}
                        title={title}
                        date={`${format(new Date(date), 'd LLLL HH:mm', {locale: ru})}`}
                        commentsCount={comments.length}
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
            <Tabs defaultIndex={1}>
              <header className={styles.comments__header}>
                <h4 className={styles.commentsTitle}>Комментарии <sup className={styles.commentsCount}>{post?.comments.length}</sup></h4>
                <TabList className={styles.comments__tabs}>
                  <Tab
                    className={styles.comments__tab}
                    selectedClassName={styles.comments__Tab_selected}
                  >По популярности</Tab>
                  <Tab
                    className={styles.comments__tab}
                    selectedClassName={styles.comments__Tab_selected}
                  >По времени</Tab>
                </TabList>
              </header>

              <section className={styles.comments__messages}>
                <TabPanel>
                  <ul className={styles.comments__messages}>
                    {post?.comments.sort(compareCommentsByLikesDesc).map((comment) => (
                      <li key={comment.id} className={styles.comments__message}>
                        <Comment
                          authorId={comment.authorId}
                          authorName={comment.authorName}
                          text={comment.text}
                          date={comment.date}
                          likes={comment.likes}
                          dislikes={comment.dislikes}
                        />
                      </li>
                    ))}
                  </ul>
                </TabPanel>
                <TabPanel>
                  <ul className={styles.comments__messages}>
                    {post?.comments.sort(compareCommentsByDateAsc).map((comment) => (
                      <li key={comment.id} className={styles.comments__message}>
                        <Comment
                          authorId={comment.authorId}
                          authorName={comment.authorName}
                          text={comment.text}
                          date={comment.date}
                          likes={comment.likes}
                          dislikes={comment.dislikes}
                        />
                      </li>
                    ))}
                  </ul>
                </TabPanel>
              </section>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
