import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const opacityKeyframes = {
  'from': {
    opacity: 0,
  },

  'to': {
    opacity: 1,
  }
};

const translateKeyframes = {
  '0%': {
    transform: 'translateY(100px)',
  },
  '100%': {
    transform: 'translateX(0)',
  },
};

const styles = StyleSheet.create({
  wrapper: {
    color: 'rgba(255, 255, 255, 1)',
    padding: '6px 24px',
    backgroundColor: '#303030',
    animationName: [opacityKeyframes, translateKeyframes],
    animationDuration: '.3s',
    borderRadius: '2px',
    position: 'fixed',
    left: '20px',
    bottom: '20px',
    height: '48px',
    display: 'flex',
    minWidth: '200px',
    alignItems: 'center',
    boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);'
  }
});

const Notifier = ({ msg }) => (
  <div className={css(styles.wrapper)}>{msg}</div>
);

const createToaster = msg => ({
  timeOut: 600,
  icon: (<div />),
  removeOnHover: true,
  showCloseButton: false,
  component: (<Notifier msg={msg} />)
});


export default createToaster;
