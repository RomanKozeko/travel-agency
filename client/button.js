import React from 'react'
import injectSheet from 'react-jss'

const styles = {
  button: {
    backgroundColor: 'yellow'
  },
  label: {
    fontWeight: 'bold',
    marginLeft: '20px',
    marginRight: '20px;'
  }
};

const button = ({classes}) => (
  <a className={classes.button}>
    button
    <span className={classes.label}>label</span>
  </a>
);

export default injectSheet(styles)(button)