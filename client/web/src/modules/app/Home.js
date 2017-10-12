import React from 'react'
import PhotoSlider from '../photoSlider/PhotoSlider';
import PagesContainer from '../pages/PagesContainer';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  pageContent: {
    padding: '70px 0 40px'
  }
});


const Home = ({ match }) => ([
  <PhotoSlider />,
  <div className="container">
    <div className={css(styles.pageContent)}>
      <PagesContainer />
    </div>
  </div>
]);

export default Home;