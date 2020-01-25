import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { compose, withHandlers } from 'recompose';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  img: {
    maxWidth: '100px'
  }
})

const ImageUpload = ({ input, updloadImg }) => {
  return (
    <div className={ css(styles.wrapper)}>
      <img className={ css(styles.img)} src={ input && input.value } alt=""/>
      <input
        className={css(styles.input)}
        type="file"
        onChange={(e) => {
        updloadImg(e)
      }}
      />
    </div>
  )
}

export default compose(
  withHandlers({
    updloadImg: ({ input, label, type, meta: { touched, error } }) => (e) => {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      fetch('/api/media-upload', {
        method: 'POST',
        body: formData
      })
      .then(response =>
        response.json().then(({ path }) => {
          input.onChange(path);
        })
      );
    }
  }),
)(ImageUpload)