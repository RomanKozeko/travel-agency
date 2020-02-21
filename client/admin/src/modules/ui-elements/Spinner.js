import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { CircularProgress } from 'material-ui/Progress';

const styles = StyleSheet.create({
  progress: {
    marginTop: '100px',
    textAlign: 'center',
  },
});

const Spinner = () => (
  <div className={css(styles.progress)}>
    <CircularProgress size={50} />
  </div>
);

export default Spinner;
