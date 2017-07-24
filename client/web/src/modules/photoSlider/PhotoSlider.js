import React from 'react'
import injectSheet from 'react-jss'

const styles = {
  wrapper: {
    height: '800px',
    width: '100%',
    background: 'url(https://avada.theme-fusion.com/photography/wp-content/uploads/sites/59/2015/11/banner-home-compressor.jpg)',
    backgroundSize: 'cover',
    marginTop: '-76px;'
  }
};


const PhotoSlider = ({classes}) => (
  <div className={classes.wrapper}>
  </div>
);


export default injectSheet(styles)(PhotoSlider)
