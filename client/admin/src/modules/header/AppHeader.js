import React from 'react'
import {StyleSheet, css} from 'aphrodite/no-important';
import Menu, {MenuItem} from 'material-ui/Menu';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

import ActionsMenu from './ActionsMenu'

const styles = StyleSheet.create({
  wrapper: {
    height: '75px',
    width: '100%',
    position: 'fixed',
    left: '0',
    top: '0',
    background: '#3B3F51',
    color: '#8c95a5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px;',
    zIndex: '10'
  },
  logo: {
    width: '265px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoLink: {
    color: '#5b9bd1',
    fontSize: '20px;',
    ':hover': {
      color: '#5b9bd1',
      textDecoration: 'none'
    }
  },
  toggleButton: {
    color: '#8c95a5'
  },
  headerLeft: {
    flexGrow: '1',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '20px'
  }
});

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

const AppHeader = () => (
  <div className={css(styles.wrapper)}>
    <div className={css(styles.logo)}>
      <a href="" className={css(styles.logoLink)}>
        Назад на сайт
      </a>
      <IconButton className={css(styles.toggleButton)} >
        <Icon>menu</Icon>
      </IconButton>
    </div>
    <div className={css(styles.headerLeft)}>
      <ActionsMenu />
      <IconButton className={css(styles.toggleButton)}>
        <Icon>power_settings_new</Icon>
      </IconButton>
    </div>
  </div>
);

export default AppHeader;