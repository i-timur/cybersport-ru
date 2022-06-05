import {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
//  @ts-ignore
import Calendar from 'react-calendar';

import {Post} from '../../interfaces';
import {postOptions} from '../../utils';
import {HomeCard} from '../../components';
import {PostsService} from '../../services';

import styles from './index.module.scss';

import 'react-calendar/dist/Calendar.css';

export const Articles: FC = () => {
  const {postType} = useParams();

  const title = postOptions.find((opt) => opt.value === postType)?.label;

  const [posts, setPosts] = useState<Post[] | null>(null);
  const [visiblePosts, setVisiblePosts] = useState<Post[] | null>(null);
  const [calendarDate, setCalendarDate] = useState<Date[] | null>(null);

  const postsService = new PostsService();

  const handleCalendarChange = (dates: Date[]) => {
    setCalendarDate(dates);
    const filteredPosts: Post[] = posts?.filter((post: Post) =>
      new Date(post.date).getTime() > new Date(dates[0]).getTime() &&
      new Date(post.date).getTime() < new Date(dates[1]).getTime()) || [];
    setVisiblePosts(filteredPosts);
  };

  const handleButtonClick = () => {
    setCalendarDate(null);
    setVisiblePosts(posts);
  };

  useEffect(() => {
    if (postType) {
      postsService.getPostsByCategory(postType).then((posts) => {
        setPosts(posts);
        setVisiblePosts(posts);
      });
    }
  }, [postType]);

  return (
    <div className={styles.articles}>
      <div className="container">
        <div className={styles.articles__container}>
          <section className={styles.articles__main}>
            <div className={styles.articles__content}>
              <h1 className={styles.articles__title}>{title}</h1>
              <div className={styles.articles__cards}>
                {visiblePosts?.map((post) => (
                  <div key={post.id} className={styles.articles__card}>
                    <div className={styles.articles__cardContainer}>
                      <HomeCard post={post} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.articles__calendar}>
              <h4 className={styles.calendar__title}>Календарь</h4>
              <Calendar
                selectRange
                value={calendarDate}
                onChange={handleCalendarChange}
                className={styles.calendar__calendarObj}
              />
              <button
                type="button"
                className={styles.calendar__reset}
                onClick={handleButtonClick}
              >Сбросить</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
