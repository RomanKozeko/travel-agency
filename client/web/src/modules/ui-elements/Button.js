import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { theme } from '../../services/constans'

const styles = StyleSheet.create({
  btn: {
    display: 'inline-block',
    color: '#fff',
    textTransform: 'uppercase',
    lineHeight: '40px',
    minWidth: '150px',
    padding: '5px 20px',
    boxSizing: 'border-box',
    transition: 'all .3s ease',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: theme.colors.primary,
    outline: 'none',
    width: '100%',
	  '@media (min-width: 500px)': {
		  width: 'auto',
	  },
    ':hover': {
      backgroundColor: theme.colors.primaryAccent,
    }
  }
});

const Button = ({children}) => (
  <button className={css(styles.btn)}>
    {children}
  </button>
)

export default Button