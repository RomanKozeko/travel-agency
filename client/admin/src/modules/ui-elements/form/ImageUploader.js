import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Button from 'material-ui/Button';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginRight: '30px',
    '@media (min-width: 800px)': {
      display: 'inline-block',
      width: 'auto',
    },
  },
  input: {
    display: 'none',
  },
  button: {
    marginTop: '15px',
    '@media (max-width: 800px)': {
      width: '100%',
    },
  },
});

const ImageUploader = ({ uploadImg, fileType }) => {
  const handleImageChange = e => {
    uploadImg({ payload: e.target.files[0], fileType });
    e.target.value = '';
  };

  return (
    <div className={css(styles.wrapper)}>
      <input
        className={css(styles.input)}
        name="file"
        id="file"
        type="file"
        onChange={e => handleImageChange(e)}
      />
      <label htmlFor="file">
        <Button
          className={css(styles.button)}
          component="span"
          variant="raised"
          color="primary"
        >
          Добавить новый файл
        </Button>
      </label>
    </div>
  );
};

export default ImageUploader;
