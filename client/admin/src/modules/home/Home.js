import React from 'react';
import PageHeader from '../ui-elements/PageHeader';
import FeaturedContainer from '../featured/FeaturedContainer';

const Home = () => <div>
  <PageHeader text={'Главная страница'} />

  <h2>Слайдер</h2>
  <h2>САМОЕ ИНТЕРЕСНОЕ</h2>
  <FeaturedContainer />
  <h2>НОВОСТИ/СОБЫТИЯ</h2>
</div>

export default Home