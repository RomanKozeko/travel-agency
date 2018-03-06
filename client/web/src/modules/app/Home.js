import React from 'react'
import PhotoSlider from '../photoSlider/PhotoSlider';
import PagesContainer from '../pages/PagesContainer';
import ToursContainer from '../tours/ToursContainer';
import BigTitle from '../ui-elements/BigTitle';
import { StyleSheet, css } from 'aphrodite/no-important';
import PageContent from '../ui-elements/PageContent'
import PromoLinks from '../promoLinks/PromoLinks'
import LatestNews from "../latestNews/LatestNews";

const styles = StyleSheet.create({
  pageContent: {
    margin: '70px 0 40px'
  }
});


const Home = ({ match }) => ([
  <PhotoSlider />,
	<PageContent>
    <BigTitle key={1} title='Самое интересное' subTitle=''/>
		<PromoLinks />

    <BigTitle key={2} title='Новости/события' subTitle=''/>
    <LatestNews />
	</PageContent>
]);

export default Home;