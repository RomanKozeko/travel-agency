import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import PrefixLink from '../ui-elements/PrefixLink'
import {Link} from 'react-router-dom';


const styles = StyleSheet.create({
  wrapper: {
    background: '#fff',
    position: 'relative',
    zIndex: '1'
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: '130px',
  },
  logo: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundImage: 'url(/web/build/logo.jpg)',
    backgroundSize: 'cover',
    color: '#222',
	  width: '133px',
    height: '120px',
    fontSize: '0',
    margin: '5px 0'

  },
  menu: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    listStyle: 'none',
    margin: '0 0 0 180px;',
    flexGrow: '1',
    '@media (max-width: 600px)': {
      margin: '0',
      display: 'none'
    }
  },
  menuItem: {
    height: '100%'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    position: 'relative',
    textTransform: 'uppercase',
    borderBottom: '3px solid transparent',
	  color: '#222',
    transition: ['color'],
    transitionDuration: 300,
    fontWeight: 'bold',
    ':hover': {
      color: '#1593d0',
      textDecoration: 'none',
      borderBottom: '3px solid #1593d0',
    },
    ':active': {
      color: '#1593d0',
      textDecoration: 'none',
      borderBottom: '3px solid #1593d0',
    },
    ':focus': {
      color: '#1593d0',
      textDecoration: 'none',
      borderBottom: '3px solid #1593d0',
    }
  }
});


const MainNav = () => (
  <div className={css(styles.wrapper)}>
    <div className="container" style={{height: '100%'}}>
      <nav className={css(styles.nav)}>
        <Link to="/" className={css(styles.logo)}>Logo</Link>
        <ul className={css(styles.menu)}>
          <li className={css(styles.menuItem)}><PrefixLink className={css(styles.link)} to="/">Главная</PrefixLink></li>
          <li className={css(styles.menuItem)}><PrefixLink className={css(styles.link)} to="/tours">Поиск туров</PrefixLink></li>
          <li className={css(styles.menuItem)}><PrefixLink className={css(styles.link)} to="/contacts">Контакты</PrefixLink></li>
        </ul>
      </nav>
    </div>
  </div>
);


export default MainNav
