import React from 'react';
import Icon from 'material-ui/Icon';
import { StyleSheet, css } from 'aphrodite/no-important';
import classNames from 'classnames';

const styles = StyleSheet.create({
  wrapper: {
    border: '1px solid rgba(198,40,40,.3)',
    backgroundColor: '#fff',
    color: '#c62828',
    boxShadow: '0 2px 3px 2px rgba(198,40,40,.03);',
    marginTop: '0;',
    marginBottom: '25px;',
    borderRadius: '4px;',
    padding: '10px',
    display: 'flex',
  },
  icon: {
    color: 'c62828'
  },
  content: {
    paddingLeft: '10px'
  }
});


const NotificationPanel = ({ children }) => (
  <div className={classNames(css(styles.wrapper))}>
    <Icon className={classNames(css(styles.icon))}>info</Icon>
    <div className={classNames(css(styles.content))}>{children}</div>
  </div>
);

export default NotificationPanel;
