import React from 'react';
import { connect } from 'react-redux'
import {StyleSheet, css} from 'aphrodite/no-important';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { logoutUser } from '../auth/authActions'

const styles = StyleSheet.create({
  wrapper: {
    height: '75px',
    width: '100%',
    background: '#3B3F51',
    color: '#8c95a5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px;',
    zIndex: '10'
  },
  logo: {
    width: '235px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoLink: {
    color: '#8c95a5',
    fontSize: '16px;',
    ':hover': {
      color: '#5b9bd1',
      textDecoration: 'none'
    }
  },
  logoutButton: {
    color: '#8c95a5'
  },
  headerLeft: {
    flexGrow: '1',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: '20px'
  }
});

export let AppHeader = ({ dispatch }) => (
  <div className={css(styles.wrapper)}>
    <div className={css(styles.logo)}>
      <a href="/" className={css(styles.logoLink)}>
        Назад на сайт
      </a>
    </div>
      <IconButton className={css(styles.logoutButton)} onClick={() => { dispatch(logoutUser()) }}>
        <Icon>power_settings_new</Icon>
      </IconButton>
  </div>
);

export default connect()(AppHeader)