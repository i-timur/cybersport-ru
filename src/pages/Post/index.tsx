import {FC, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {format} from 'date-fns';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {Circles} from 'react-loader-spinner';
import {observer} from 'mobx-react-lite';

import {useAuth, useStores} from '../../hooks';
import {NoAvatar} from '../../assets/images';
import {Post, Comm, User} from '../../interfaces';
import {compareCommentsByDateAsc} from '../../utils';
import {Editor, NewsItem, Comment} from '../../components';
import {CommentsService, PostsService, UserService} from '../../services';

import styles from './index.module.scss';

export const PostComponent: FC = observer(() => {
  const {id, category} = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedNews, setRelatedNews] = useState<Post[] | null>(null);
  const [comments, setComments] = useState<Comm[] | null>(null);
  const [commentValue, setCommentValue] = useState<string>('');
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const {auth} = useAuth();
  const {store: {userStore: {user}}} = useStores();

  const postsService = new PostsService();
  const commentsService = new CommentsService();
  const userService = new UserService();

  const handleClick = () => {
    if (user?.id && commentValue.trim()) {
      const comm: Comm = {
        authorId: user.id,
        postId: id!,
        text: commentValue,
        likes: [],
        dislikes: [],
        date: new Date()
      };

      commentsService.createComment(comm)
        .then(() => {
          setCommentValue('');
          setComments((prevState) => (prevState ? ([...prevState, comm]) : [comm]));
        });
    }
  };

  const findUsername = (id: string) => {
    return users?.find((user) => user.id === id)?.login || '';
  };

  useEffect(() => {
    if (id) {
      postsService.getById(id).then((post) => {
        setPost(post);
        setLoading(false);
      });
      postsService.getPostsByCategoryAndGame('news', category!).then((relatedNews) => {
        setRelatedNews(relatedNews.filter((obj) => obj.id !== id).slice(0, 5));
      });
      commentsService.getComments(id)
        .then((comms) => {
          setComments(comms);
        });
      userService.getAllUsers().then((users) => setUsers(users));
    }
  }, [id]);

  const handleLike = (id: string) => {
    if (user) {
      const comment = comments?.find((comm) => comm.id === id);
      if (comment?.likes?.includes(user.id)) {
        commentsService.unlikeComment(id).then(() => {
          let newComments: Comm[] = [];
          let commIdx = -1;
          if (comments) {
            for (const comm of comments) {
              if (comm.id === id) {
                commIdx = comments.indexOf(comm);
                break;
              }
            }
            newComments = [...comments];
            newComments[commIdx].likes = newComments[commIdx].likes?.filter((userId) => userId !== user.id);
            setComments(newComments);
          }
        });
      } else {
        commentsService.likeComment(id).then(() => {
          let newComments: Comm[] = [];
          let commIdx = -1;
          if (comments) {
            for (const comm of comments) {
              if (comm.id === id) {
                commIdx = comments.indexOf(comm);
                break;
              }
            }
            newComments = [...comments];
            if (newComments[commIdx]) {
              if (newComments[commIdx].likes) {
                newComments[commIdx].likes?.push(user.id);
              } else {
                newComments[commIdx].likes = [user.id];
              }
              setComments(newComments);
            }
          }
        });
      }
    }
  };

  const handleDislike = (id: string) => {
    if (user) {
      const comment = comments?.find((comm) => comm.id === id);
      if (comment?.dislikes?.includes(user.id)) {
        commentsService.undislikeComment(id).then(() => {
          let newComments: Comm[] = [];
          let commIdx = -1;
          if (comments) {
            for (const comm of comments) {
              if (comm.id === id) {
                commIdx = comments.indexOf(comm);
                break;
              }
            }
            newComments = [...comments];
            newComments[commIdx].dislikes = newComments[commIdx].dislikes?.filter((userId) => userId !== user.id);
            setComments(newComments);
          }
        });
      } else {
        commentsService.dislikeComment(id).then(() => {
          let newComments: Comm[] = [];
          let commIdx = -1;
          if (comments) {
            for (const comm of comments) {
              if (comm.id === id) {
                commIdx = comments.indexOf(comm);
                break;
              }
            }
            newComments = [...comments];
            if (newComments[commIdx]) {
              if (newComments[commIdx].dislikes) {
                newComments[commIdx].dislikes?.push(user.id);
              } else {
                newComments[commIdx].dislikes = [user.id];
              }
              setComments(newComments);
            }
          }
        });
      }
    }
  };

  return (
    <div className={styles.post}>
      <div className={`${styles.postContainer} container`}>
        {loading ? (
          <div className="loader">
            <Circles
              height="100"
              width="100"
              color="#EE773B"
              ariaLabel="loading"
            />
          </div>
        ) : (
          <div className={styles.postMain}>
            <div className={styles.postLeft}>
              <div className={styles.leftContainer}>
                <h6 className={styles.leftHeader}>Похожие новости</h6>
                <div className={styles.leftPosts}>
                  {relatedNews && (
                    relatedNews.map(({id, game, date, title, comments}) => (
                      <div className={styles.leftPost} key={id}>
                        <NewsItem
                          id={id ?? '-1'}
                          game={game}
                          title={title}
                          date={new Date(date)}
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
        )}
        <div className={styles.postComments}>
          <div className={styles.commentsContainer}>
            <Tabs defaultIndex={1}>
              <header className={styles.comments__header}>
                <h4 className={styles.commentsTitle}>Комментарии <sup className={styles.commentsCount}>{comments?.length}</sup></h4>
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
                    {comments && comments.map((comment) => (
                      <li key={comment.id} className={styles.comments__message}>
                        <Comment
                          authorId={comment.authorId}
                          authorName={findUsername(comment.authorId)}
                          text={comment.text}
                          date={comment.date}
                          likes={comment.likes?.length ?? 0}
                          dislikes={comment.dislikes?.length ?? 0}
                          liked={user?.id ? comment.likes?.includes(user.id) : false}
                          disliked={user?.id ? comment.dislikes?.includes(user.id) : false}
                          onLike={() => handleLike(comment.id!)}
                          onDislike={() => handleDislike(comment.id!)}
                        />
                      </li>
                    ))}
                  </ul>
                </TabPanel>
                <TabPanel>
                  <ul className={styles.comments__messages}>
                    {comments && comments.sort(compareCommentsByDateAsc).map((comment) => (
                      <li key={comment.id} className={styles.comments__message}>
                        <Comment
                          authorId={comment.authorId}
                          authorName={findUsername(comment.authorId)}
                          text={comment.text}
                          date={comment.date}
                          likes={comment.likes?.length ?? 0}
                          dislikes={comment.dislikes?.length ?? 0}
                          liked={user?.id ? comment.likes?.includes(user.id) : false}
                          disliked={user?.id ? comment.dislikes?.includes(user.id) : false}
                          onLike={() => handleLike(comment.id!)}
                          onDislike={() => handleDislike(comment.id!)}
                        />
                      </li>
                    ))}
                  </ul>
                </TabPanel>
              </section>
            </Tabs>
          </div>
          {auth && (
            <aside className={styles.comments__reply}>
              <div className={styles.reply__container}>
                <div className={styles.reply__message}>
                  <div className={styles.reply__avatar}>
                    <div className={styles.reply__img}>
                      <img src={NoAvatar} alt="avatar" />
                    </div>
                  </div>
                  <div className={styles.reply__control}>
                    <textarea
                      className={styles.reply__textarea}
                      value={commentValue}
                      onChange={(event) => setCommentValue(event.target.value)}
                    />
                    <button
                      type="button"
                      className={styles.reply__btn}
                      onClick={handleClick}
                    >
                      Отправить
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          )}
          </div>
      </div>
    </div>
  );
});
