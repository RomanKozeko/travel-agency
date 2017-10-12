import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import FormButton from '../ui-elements/FormButton';

const styles = StyleSheet.create({
  wrapper: {
    height: '800px',
    width: '100%',
    backgroundImage: 'url(/web/build/forest2.jpg)',
    backgroundSize: 'cover',
    marginTop: '-76px;',
    display: 'flex',
    alignItems: 'flex-end',
    color: '#fff'
  },
  title: {
    lineHeight: '30px',
    fontSize: '22px',
    textTransform: 'uppercase'
  },
  sliderWrapper: {
    paddingBottom: '130px',
    width: '50%'
  },
  titleMain: {
    fontSize: '50px',
    textTransform: 'uppercase',
    lineHeight: '60px;',
    margin: '25px 0 20px'
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
        <div className={css(styles.title)}>from <span className={css(styles.titleSpan)}>$400</span> / person</div>
        <div className={css(styles.titleMain)}>popular forest tour</div>
        <p className={css(styles.text)}>
          Curabitur nunc erat, consequat in erat ut, congue bibendum nulla. Suspendisse id pharetra lacus, et  quis leo elementum. Lorem ipsum adipiscing elit.
        </p>
        <FormButton>Learn more</FormButton>
      </div>
    </div>
  </div>
);


export default PhotoSlider
