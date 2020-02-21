import React from 'react';
import PageHeader from '../ui-elements/PageHeader';
import FeaturedContainer from '../featured/FeaturedContainer';
import NewsContainer from '../news/NewsContainer';
import SliderContainer from '../slider/SliderContainer';

const Home = () => (
  <div>
    <PageHeader text={'Главная страница'} />

    <h2>Слайдер</h2>
    <SliderContainer />
    <h2>Самое интересное</h2>
    <FeaturedContainer />
    <h2>Новости/События</h2>
    <NewsContainer />
  </div>
);

export default Home;
