import {FC} from 'react';

import {HotNews, MainNews, MoreBtn} from '../../components';

import {HomeCard} from './components';
import './Home.scss';

const Home: FC = () => {
  return (
    <main className="home">
      <div className="home__container">
        <section className="home__hot-news hot-news-home">
          <HotNews />
        </section>
        <section className="home__main main-home">
          <div className="main-home__container container">
            <div className="main-home__left">
              <MainNews />
            </div>
            <div className="main-home__right">
              <div className="main-home__cards">
                <div className="main-home__card card-main-home">
                  <div className="card-main-home__container">
                    <HomeCard />
                  </div>
                </div>

                <div className="main-home__card card-main-home">
                  <div className="card-main-home__container">
                    <HomeCard />
                  </div>
                </div>

                <div className="main-home__card card-main-home">
                  <div className="card-main-home__container">
                    <HomeCard />
                  </div>
                </div>

                <div className="main-home__card card-main-home">
                  <div className="card-main-home__container">
                    <HomeCard />
                  </div>
                </div>
              </div>

              <div className="main-home__btn">
                {/* eslint-disable-next-line no-console */}
                <MoreBtn onClick={() => console.log('More btn is clicked!')} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
