import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import { Link } from 'react-router-dom';
import MenuContainer from '../menu/MenuContainer';


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
	logoBssr: {
    backgroundImage: 'url(/web/build/bssrLogo.png)',
    height: '100%',
    width: '215px',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    marginLeft: '10px',
    marginTop: '5px'
  }
});

const MainNav = ({ menuItems }) => (
  <div className={css(styles.wrapper)}>
    <div className="container" style={{height: '100%'}}>
      <nav className={css(styles.nav)}>
        <Link to="/" className={css(styles.logo)}>Logo</Link>
        <div className={css(styles.logoBssr)} />
        <MenuContainer />
      </nav>
    </div>
  </div>
);

export default MainNav
