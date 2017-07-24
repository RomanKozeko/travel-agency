import React from 'react'
import injectSheet from 'react-jss'
import {
  Route,
  Link
} from 'react-router-dom';


const styles = {
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
    '&:hover': {
      color: '#fc1d1d',
      textDecoration: 'none'
    },
    '&:active': {
      color: '#fc1d1d',
      textDecoration: 'none'
    },
    '&:focus': {
      color: '#fc1d1d',
      textDecoration: 'none'
    }
  }
};


const MainNav = ({classes}) => (
  <div className={classes.wrapper}>
    <div className="container" style={{height: '100%'}}>
      <nav className={classes.nav}>
        <div className={classes.logo}>Logo</div>
        <ul className={classes.menu}>
          <li><Link className={classes.link} to="/">Home</Link></li>
          <li><Link className={classes.link} to="/contacts">Contacts</Link></li>
          <li><Link className={classes.link} to="/tours">Tours</Link></li>
          <li><Link className={classes.link} to="/tour/max">tour max</Link></li>
        </ul>
      </nav>
    </div>
  </div>
);


export default injectSheet(styles)(MainNav)
