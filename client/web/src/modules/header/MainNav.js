import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import MenuContainer from '../menu/MenuContainer';

const styles = StyleSheet.create({
  wrapper: {
    background: '#fff',
    position: 'relative',
    zIndex: '2',
    borderTop: '1px solid rgba(0,0,0,0.08)',
    boxShadow: '0 5px 10px rgba(0,0,0,0.1)',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: '60px',
    position: 'relative',
  },
});

const MainNav = ({ menuItems }) => (
  <div className={css(styles.wrapper)}>
    <div className="container" style={{ height: '100%' }}>
      <nav className={css(styles.nav)}>
        <MenuContainer />
      </nav>
    </div>
  </div>
);

export default MainNav;
