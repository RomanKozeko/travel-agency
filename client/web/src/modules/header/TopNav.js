import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import LanguagesNav from '../ui-elements/LanguagesNav'

const styles = StyleSheet.create({
  wrapper: {
    background: '#fff',
    padding: '20px 0',
    boxSizing: 'border-box'
  },
  item: {
    display: 'inline-flex',
    color: '#1593d0',
    marginRight: '20px',
    alignItems: 'center',
    '@media (max-width: 600px)': {
      marginTop: '10px'
    }
  },
  text: {
    color: 'rgba(34, 34, 34, 0.6);',
    marginLeft: '10px'
  },
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    '@media (max-width: 600px)': {
      flexDirection: 'column-reverse;'
    }
  },
  right: {
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 600px)': {
      textAlign: 'center'
    }
  }
});

const TopNav = () => (
  <div className={css(styles.wrapper)}>
    <div className="container">
      <div className={css(styles.inner)}>
        <div className="col">
          <div className={css(styles.item)}>
            <i className="material-icons">local_phone</i>
            <span className={css(styles.text)}>contact with us: +375 0369 09 010</span>
          </div>
          <div className={css(styles.item)}>
            <i className="material-icons">mail</i>
            <span className={css(styles.text)}>e-mail: let’stravel@let’stravel.com</span>
          </div>
        </div>
        <div className={css(styles.right)}>
          <LanguagesNav/>
        </div>
      </div>
    </div>
  </div>
);


export default TopNav
