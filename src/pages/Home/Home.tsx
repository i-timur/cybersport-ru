import {FC, useEffect, useState} from 'react';
import {Circles} from 'react-loader-spinner';

import {HotNews, MainNews, HomeCards} from '../../components';
import {Post} from '../../interfaces';
import {PostsService} from '../../services/postsService';

import './Home.scss';

const Home: FC = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const postsService = new PostsService();

  useEffect(() => {
    postsService.getAllPosts()
      .then((posts) => {
        setPosts(posts);
        setLoading(false);
      });
  }, []);

  return (
    <main className="home">
      <div className="home__container">
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
          <>
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
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
