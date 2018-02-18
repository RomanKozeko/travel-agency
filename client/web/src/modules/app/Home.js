import React from 'react'
import PhotoSlider from '../photoSlider/PhotoSlider';
import PagesContainer from '../pages/PagesContainer';
import ToursContainer from '../tours/ToursContainer';
import BigTitle from '../ui-elements/BigTitle';
import { StyleSheet, css } from 'aphrodite/no-important';
import PageContent from '../ui-elements/PageContent'

const styles = StyleSheet.create({
  pageContent: {
    margin: '70px 0 40px'
  }
});


const Home = ({ match }) => ([
  <PhotoSlider />,
	<PageContent>
    <BigTitle key={1} title='Available pages now 123123' subTitle='latest pages'/>
    <PagesContainer />
    <BigTitle key={2} title='Popular sea tours' subTitle='latest tours'/>
    <ToursContainer />
	</PageContent>
]);

export default Home;