import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  wrapper: {
    height: '800px',
    width: '100%',
    background: 'url(https://avada.theme-fusion.com/photography/wp-content/uploads/sites/59/2015/11/banner-home-compressor.jpg)',
    backgroundSize: 'cover',
    marginTop: '-76px;'
  }
});


const PhotoSlider = () => (
  <div className={css(styles.wrapper)}>
  </div>
);


export default PhotoSlider
