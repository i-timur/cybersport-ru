import {FC, useEffect, useState} from 'react';

import {HotNews, MainNews, HomeCards} from '../../components';
import {Post} from '../../interfaces';
import {http} from '../../client';
import {comparePosts, makeArrayOf} from '../../utils';

import './Home.scss';

const Home: FC = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    http.get('posts.json')
      .then((res: any) => {
        const posts: Post[] = makeArrayOf(res)
          .map((post) => {
            return {
              ...post,
              comments: post.comments ? makeArrayOf(post.comments) : []
            };
          })
          .sort(comparePosts);
        setPosts(posts);
      });
  }, []);

  return (
    <main className="home">
      <div className="home__container">
        <section className="home__hot-news hot-news-home">
          {posts && <HotNews posts={posts} />}
        </section>
        <section className="home__main main-home">
          <div className="main-home__container container">
            <div className="main-home__left">
              {posts && <MainNews posts={posts.filter((post) => post.postType.value === 'news')} />}
            </div>
            <div className="main-home__right">
              <div className="main-home__cards">
                {posts && <HomeCards posts={posts.filter((post) => post.postType.value !== 'news')} />}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
