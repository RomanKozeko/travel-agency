import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  loadingItem: {
    height: '220px',
    margin: '15px',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
    transition: 'box-shadow .3s ease-in',
    overflow: 'hidden',
    '@media (min-width: 500px)': {
      width: 'calc(100% / 2 - 30px)',
    },
    '@media (min-width: 970px)': {
      width: 'calc(100% / 3 - 30px)',
    },
    position: 'relative',
    animation: 'progress 1.2s ease-in-out infinite;',
    backgroundColor: '#eee;',
    backgroundImage: 'linear-gradient(90deg, #eee, #f5f5f5, #eee);',
    backgroundSize: '200px 100%;',
    backgroundRepeat: 'no-repeat;',
    display: 'inline-block;',
    lineHeight: '1;',
    width: '100%;'
  },
});

const LoadingItems = ({ count }) => {
  const res = [];
  for (let i = 0; i < count; i++) {
    res.push(<div className={css(styles.loadingItem)} />)
  }

  return res
}

export default LoadingItems



