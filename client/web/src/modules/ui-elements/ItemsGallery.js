import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 -10px',
  },
});
const ItemsGallery = ({ children }) => (
  <div className={css(styles.wrapper)}>{children}</div>
);

export default ItemsGallery;
