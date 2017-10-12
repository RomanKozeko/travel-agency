import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  input: {
    width: '100%',
    display: 'inline-block',
    border: '1px solid #bebebe',
    marginBottom: '20px;',
    borderRadius: '5px',
    padding: '20px',
    boxSizing: 'border-box',
    transition: 'border .3s ease',
    outline: 'none',
    maxWidth: '100%',
    minWidth: '100%',
    ':focus': {
      border: '1px solid #022c54',
    }
  },
  pageContent: {
    padding: '40px 0'
  }
});

const TextArea = ({placeholder}) => (
  <textarea
    name=""
    id=""
    cols="20"
    placeholder={placeholder}
    className={css(styles.input)}
    rows="5"
  >
  </textarea>
)

export default TextArea