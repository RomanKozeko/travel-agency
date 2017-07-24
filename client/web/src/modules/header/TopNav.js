import React from 'react'
import injectSheet from 'react-jss'

const styles = {
  wrapper: {
    height: '57px',
    background: '#fff',
    padding: '20px 0',
    boxSizing: 'border-box'
  },
  item: {
    display: 'inline-flex',
    color: '#1593d0',
    marginRight: '20px'
  },
  text: {
    color: 'rgba(34, 34, 34, 0.6);',
    marginLeft: '10px'
  }
};


const TopNav = ({classes}) => (
  <div className={classes.wrapper}>
    <div className="container">
      <div className={classes.item}>
        <i className="material-icons">local_phone</i>
        <span className={classes.text}>contact with us: +375 0369 09 010</span>
      </div>
      <div className={classes.item}>
        <i className="material-icons">mail</i>
        <span className={classes.text}>e-mail: let’stravel@let’stravel.com</span>
      </div>
    </div>
  </div>
);


export default injectSheet(styles)(TopNav)
