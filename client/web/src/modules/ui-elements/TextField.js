import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  input: {
    width: '100%',
    display: 'inline-block',
    height: '60px',
    border: '1px solid #bebebe',
    marginBottom: '20px;',
    borderRadius: '5px',
    padding: '5px 20px',
    boxSizing: 'border-box',
    transition: 'border .3s ease',
    outline: 'none',
    ':focus': {
      border: '1px solid #022c54',
    }
  },
  pageContent: {
    padding: '40px 0'
  }
});

const TextField = ({placeholder}) => (
  <input type="text" placeholder={placeholder} className={css(styles.input)} />
)

export default TextField