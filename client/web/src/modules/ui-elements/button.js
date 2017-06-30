import React from 'react'
import injectSheet from 'react-jss'

const styles = {
  button: {
    width: '100%',
    display: 'inline-block',
    lineHeight: '40px',
    borderRadius: '5px',
    color: '#fff',
    backgroundColor: '#333',
    cursor: 'pointer',
    transition: ['background'],
    transitionDuration: 300,
    margin: [5, 0],
    textAlign: 'center',
    '&:hover': {
      backgroundColor: 'blue'
    },
    '@media (min-width: 800px)': {
      width: 'auto'
    }

  },
  label: {
    fontWeight: 'bold',
    marginLeft: '20px',
    marginRight: '20px;'
  }
};

const button = ({classes, text}) => (
  <a className={classes.button}>
    <span className={classes.label}>{text}</span>
  </a>
);

export default injectSheet(styles)(button)