import {FC} from 'react';
import {Link} from 'react-router-dom';
import {format} from 'date-fns';

import {NoAvatar} from '../../assets/images';
import {Icon} from '../index';

import styles from './index.module.scss';

interface Props {
  authorId: string;
  authorName: string;
  text: string;
  date: Date;
  likes: number;
  dislikes: number;
  liked?: boolean;
  disliked?: boolean;
  onLike: () => void;
  onDislike: () => void;
}

export const Comment: FC<Props> = ({authorId, authorName, text, date, likes, dislikes, liked = false, disliked = false, onLike, onDislike}) => {
  return (
    <div className={styles.comment}>
      <div className={styles.comment__left}>
        <div className={styles.comment__img}>
          <img src={NoAvatar} alt="Аватар пользователя" />
        </div>
      </div>
      <div className={styles.comment__right}>
        <header className={styles.comment__contentHeader}>
          <div className={styles.comment__userInfo}>
            <Link to={`/users/${authorId}`} className={styles.comment__author}>{authorName}</Link>
            <span className={styles.comment__userRating}>/&nbsp;Новичок&nbsp;/</span>
            <div className={styles.comment__userRang}>
              <Icon name="star" color="#70CF0A" size={13} />
              <span>&nbsp;13</span>
            </div>
          </div>
          <div className={styles.comment__date}>
            <time dateTime={new Date(date).toISOString()}>{format(new Date(date), 'd.L.y HH:mm')}</time>
          </div>
        </header>
        <section className={styles.comment__body}>
          <p className={styles.comment__text}>{text}</p>
        </section>
        <footer className={styles.comment__footer}>
          <div className={styles.comment__likes}>
            <button
              type="button"
              className={`${styles.comment__like} ${styles.comment__like_green} ${liked ? styles.comment__like_green_active : ''}`}
              onClick={onLike}
            >
              <Icon name="like" color="#99BA70" hoverColor="#FFFFFF" />
            </button>
            <span className={styles.comment__likeAmount}>{likes ? likes : ''}</span>
            <button
              type="button"
              className={`${styles.comment__like} ${styles.comment__like_red} ${disliked ? styles.comment__like_red_active : ''}`}
              onClick={onDislike}
            >
              <Icon name="dislike" color="#D61D29" hoverColor="#FFFFFF" />
            </button>
            <span className={styles.comment__likeAmount}>{dislikes ? dislikes : ''}</span>
          </div>
          <div className={styles.comment__controls}>
            <button type="button" className={styles.comment__control}>
              Цитировать
            </button>
            <span>&nbsp;/&nbsp;</span>
            <button type="button" className={styles.comment__control}>
              Ответить
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
