import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';

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
    alignItems: 'center'
  },
  text: {
    color: 'rgba(34, 34, 34, 0.6);',
    marginLeft: '10px'
  }
});

const TopNav = () => (
  <div className={css(styles.wrapper)}>
    <div className="container">
      <div className={css(styles.item)}>
        <i className="material-icons">local_phone</i>
        <span className={css(styles.text)}>contact with us: +375 0369 09 010</span>
      </div>
      <div className={css(styles.item)}>
        <i className="material-icons">mail</i>
        <span className={css(styles.text)}>e-mail: let’stravel@let’stravel.com</span>
      </div>
    </div>
  </div>
);


export default TopNav
