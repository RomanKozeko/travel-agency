import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

const Star = ({color}) => {
  return (
    <svg fill={color} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    whiteSpace: 'nowrap'
  },
});

const StarsList = ({starsCount, maxStars = 5}) => {
  const starsArr = [];

  for(let i = 0; i < maxStars; i++) {
    const color = i < starsCount ? '#ffb300' : '#9e9e9e';
    starsArr.push(<Star key={i} color={color} />)
  }

  return (<div className={css(styles.wrapper)}>{starsArr}</div>)
};

export default StarsList;
