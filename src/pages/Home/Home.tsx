import {FC} from 'react';

import {HotNews} from '../../components';

const Home: FC = () => {
  return (
    <main className="home">
      <div className="home__container">
        <section className="home__hot-news hot-news-home">
          <HotNews />
        </section>
      </div>
    </main>
  );
};

export default Home;
