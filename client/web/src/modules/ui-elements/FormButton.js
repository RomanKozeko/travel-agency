import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { theme } from '../../services/constans';

const styles = StyleSheet.create({
  btn: {
    display: 'inline-block',
    color: '#fff',
    textTransform: 'uppercase',
    lineHeight: '40px',
    minWidth: '150px',
    marginBottom: '20px;',
    padding: '5px 20px',
    boxSizing: 'border-box',
    transition: 'all .3s ease',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: theme.colors.primary,
    outline: 'none',
    ':hover': {
      backgroundColor: theme.colors.primaryAccent,
    },
  },
});

const FormButton = ({ children, handleClick }) => (
  <button onClick={handleClick} className={css(styles.btn)}>
    {children}
  </button>
);

export default FormButton;
