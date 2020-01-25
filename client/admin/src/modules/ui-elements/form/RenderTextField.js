import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import {StyleSheet, css} from 'aphrodite/no-important';

const styles = StyleSheet.create({
  field: {
    marginBottom: '10px;'
  },
  input: {

  }
});

const RenderTextField = (field) => {
  return (
    <div className={css(styles.field)}>
      <TextField
        className={css(styles.input)}
        fullWidth {...field.input}
        label={field.label}
      />
      {field.meta.touched && field.meta.error &&
      <span className="error">{field.meta.error}</span>}
    </div>
  );
};

export default RenderTextField;