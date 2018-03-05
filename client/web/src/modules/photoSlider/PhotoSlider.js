import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import FormButton from '../ui-elements/FormButton';

const styles = StyleSheet.create({
  wrapper: {
    height: '500px',
    width: '100%',
    backgroundImage: 'url(/web/build/forest2.jpg)',
    backgroundSize: 'cover',
    marginTop: '-76px;',
    display: 'flex',
    alignItems: 'center',
    color: '#fff'
  },
  title: {
    lineHeight: '30px',
    fontSize: '22px',
    textTransform: 'uppercase',
    paddingTop: '40px'
  },
  sliderWrapper: {
	  '@media (min-width: 800px)': {
		  width: '50%',
	  },
  },
  titleMain: {
    fontSize: '35px',
    textTransform: 'uppercase',
    lineHeight: '45px;',
    margin: '20px 0 10px'
  },
  titleSpan: {
    color: '#1593d0',
    fontSize: '32px;'
  },
  text: {
    marginBottom: '20px;'
  }
});


const PhotoSlider = () => (
  <div className={css(styles.wrapper)}>
    <div className="container">
      <div className={css(styles.sliderWrapper)}>
        <div className={css(styles.title)}>от <span className={css(styles.titleSpan)}>$400</span></div>
        <div className={css(styles.titleMain)}>Популярные леса Беларусии</div>
        <p className={css(styles.text)}>
          Curabitur nunc erat, consequat in erat ut, congue bibendum nulla. Suspendisse id pharetra lacus, et  quis leo elementum. Lorem ipsum adipiscing elit.
        </p>
        <FormButton>Подробнее</FormButton>
      </div>
    </div>
  </div>
);


export default PhotoSlider
