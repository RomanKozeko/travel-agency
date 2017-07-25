import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import {
  Route,
  Link
} from 'react-router-dom';



const styles = StyleSheet.create({
  wrapper: {
    height: '76px;',
    background: 'rgba(0,0,0,0.4)',
    position: 'relative',
    zIndex: '1'
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  logo: {
    display: 'inline-flex',
    alignItems: 'center',
    color: '#1593d0',
    width: '200px'
  },
  menu: {
    display: 'flex',
    justifyContent: 'space-between',
    listStyle: 'none',
    margin: '0 0 0 180px;',
    flexGrow: '1'
  },
  link: {
    textTransform: 'uppercase',
    color: '#fff',
    transition: ['color'],
    transitionDuration: 300,
    fontWeight: 'bold',
    ':hover': {
      color: '#fc1d1d',
      textDecoration: 'none'
    },
    ':active': {
      color: '#fc1d1d',
      textDecoration: 'none'
    },
    ':focus': {
      color: '#fc1d1d',
      textDecoration: 'none'
    }
  }
});


const MainNav = () => (
  <div className={css(styles.wrapper)}>
    <div className="container" style={{height: '100%'}}>
      <nav className={css(styles.nav)}>
        <div className={css(styles.logo)}>Logo</div>
        <ul className={css(styles.menu)}>
          <li><Link className={css(styles.link)} to="/">Home</Link></li>
          <li><Link className={css(styles.link)} to="/contacts">Contacts</Link></li>
          <li><Link className={css(styles.link)} to="/tours">Tours</Link></li>
          <li><Link className={css(styles.link)} to="/tour/max">tour max</Link></li>
        </ul>
      </nav>
    </div>
  </div>
);


export default MainNav
