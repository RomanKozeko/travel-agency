import React from 'react'
import {StyleSheet, css} from 'aphrodite/no-important';

const styles = StyleSheet.create({
  footer: {
    background: '#141414',
    padding: '70px 0 0'
  },
  bottom: {
    background: '#0c0c0c',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '90px',
    color: '#777777',
    marginTop: '70px'
  },
  left: {
    float: 'left'
  },
  right: {
    float: 'right'
  },
  header: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
    marginBottom: '20px'
  },
  columnText: {
    paddingTop: '30px;',
    color: '#fff'
  },
  columnInner: {
    color: '#777777'
  },
  button: {
    display: 'inline-block',
    lineHeight: '30px',
    borderRadius: '5px',
    width: '100%',
    textAlign: 'center',
    fontSize: '13px',
    marginBottom: '5px',
    color: 'rgba(255, 255, 255, 0.6);',
    ':hover': {
      color: 'rgba(255, 255, 255, 0.6);',
      textDecoration: 'none'
    },
    ':active': {
      color: 'rgba(255, 255, 255, 0.6);',
      textDecoration: 'none'
    },
    ':focus': {
      color: 'rgba(255, 255, 255, 0.6);',
      textDecoration: 'none'
    }
  },
  fb: {
    background: '#3b5998;'
  },
  vk: {
    background: '#507299'
  },
  google: {
    background: '#d0422a'
  }
});
const Footer = () => (
  <footer className={css(styles.footer)}>
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          <h4 className={css(styles.header)}>Contact us</h4>
          <div className={css(styles.columnText)}>Phone: <span className={css(styles.columnInner)}>+37529-624-97-84</span></div>
          <div className={css(styles.columnText)}>Email: <span className={css(styles.columnInner)}>email@email.com</span></div>
          <div className={css(styles.columnText)}>Address: <span className={css(styles.columnInner)}>Nesovisimosti 6</span></div>
        </div>
        <div className="col-md-3">
          <h4 className={css(styles.header)}>Follow us</h4>
          <a href="" className={css(styles.button, styles.fb)}>Facebook</a>
          <a href="" className={css(styles.button, styles.vk)}>Vkontakte</a>
          <a href="" className={css(styles.button, styles.google)}>Google +</a>
        </div>
        <div className="col-xs-4"></div>
      </div>

    </div>
    <div className={css(styles.bottom)}>
      <div className='container'>
        <div className={css(styles.left)}>
          Logo
        </div>
        <div className={css(styles.right)}>
          © 2015 All rights reserved.
        </div>
      </div>
    </div>

  </footer>
);


export default Footer
