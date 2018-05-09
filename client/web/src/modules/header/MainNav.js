import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import { Link } from 'react-router-dom';
import MenuContainer from '../menu/MenuContainer';


const styles = StyleSheet.create({

  wrapper: {
    background: '#fff',
    position: 'relative',
    zIndex: '1',
    borderTop: '1px solid rgba(0,0,0,0.05)',
    boxShadow: '0 5px 10px rgba(0,0,0,0.1)',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: '130px',
    position: 'relative'
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
    marginTop: '5px',
    display: 'none',
    '@media (min-width: 600px)': {
      display: 'block'
    }
  },
  logoWrap: {
    display: 'flex'
  }
});

const MainNav = ({ menuItems }) => (
  <div className={css(styles.wrapper)}>
    <div className="container" style={{height: '100%'}}>
      <nav className={css(styles.nav)}>
        <div className={css(styles.logoWrap)}>
          <Link to="/" className={css(styles.logo)}>Logo</Link>
          <div className={css(styles.logoBssr)} />
        </div>
        <MenuContainer />
      </nav>
    </div>
  </div>
);

export default MainNav
