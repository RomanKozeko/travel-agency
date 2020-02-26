import React from 'react';
import PhotoSliderContainer from '../photoSlider/PhotoSliderContainer';
import BigTitle from '../ui-elements/BigTitle';
import PageContent from '../ui-elements/PageContent';
import PromoLinks from '../promoLinks/PromoLinks';
import LatestNews from '../latestNews/LatestNews';

const Home = ({ match }) => [
  <PhotoSliderContainer />,
  <PageContent>
    <BigTitle key={1} title={window.TA.content.mostInteresting} subTitle="" />
    <PromoLinks />
    <BigTitle key={2} title={window.TA.content.news} subTitle="" />
    <LatestNews />
  </PageContent>,
];

export default Home;
