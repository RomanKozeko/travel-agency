import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import FormButton from '../ui-elements/FormButton';
import { theme } from '../../services/constans'

const styles = StyleSheet.create({
  wrapper: {
	  height: '500px',
    width: '100%',
	  background: '#333',
    backgroundImage: 'url(/web/build/DSC_0200.JPG)',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    color: '#fff',
    ':before': {
      content: '""',
      top: 0,
      left: 0,
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,.32)'
    },
	  '@media (min-width: 1300px)': {
		  height: '700px',
	  },
  },
  title: {
    lineHeight: '30px',
    fontSize: '22px',
    textTransform: 'uppercase',
  },
  sliderWrapper: {
	  position: 'relative',
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
    color: theme.colors.primary,
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
