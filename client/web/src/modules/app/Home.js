import React from 'react'
import PhotoSliderContainer from '../photoSlider/PhotoSliderContainer';
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
  <PhotoSliderContainer />,
	<PageContent>
    <BigTitle key={1} title={ window.TA.content.mostInteresting } subTitle=''/>
		<PromoLinks />

    <BigTitle key={2} title={ window.TA.content.news } subTitle=''/>
    <LatestNews />
	</PageContent>
]);

export default Home;