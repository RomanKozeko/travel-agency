import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  btn: {
    display: 'inline-block',
    color: '#fff',
    textTransform: 'uppercase',
    lineHeight: '50px',
    minWidth: '150px',
    marginBottom: '20px;',
    padding: '5px 20px',
    boxSizing: 'border-box',
    transition: 'all .3s ease',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#022c54',
    outline: 'none',
    ':hover': {
      backgroundColor:'#1593d0'
    }
  }
});

const FormButton = ({children}) => (
  <button className={css(styles.btn)}>
    {children}
  </button>
)

export default FormButton