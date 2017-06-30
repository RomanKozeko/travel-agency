import React from 'react'
import injectSheet from 'react-jss'

const styles = {
  input: {
    width: '100%',
    display: 'block',
    lineHeight: '40px',
    borderRadius: '5px',
    border: '1px solid #333',
    color: '#999',
    backgroundColor: '#fff',
    transition: ['background'],
    transitionDuration: 300,
    margin: [5, 0],
    textAlign: 'center',
    boxSizing: 'border-box',
    '&:hover': {
      backgroundColor: '#eaeaea'
    },
    '@media (min-width: 800px)': {
      width: 'auto'
    }
  }
};

const Input = ({classes}) => (
  <input type="text" className={classes.input} />
);

export default injectSheet(styles)(Input)