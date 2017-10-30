import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Button from 'material-ui/Button';

const styles = StyleSheet.create({
  wrapper: {
    display: 'inline-block',
    marginRight: '30px'
  },
  input: {
    display: 'none'
  }
});

const ImageUploader = ({ uploadImg }) => {
  const handleImageChange = (e) => {
    uploadImg(e.target.files[0]);
	  e.target.value = '';
  };

  return (
    <div className={css(styles.wrapper)}>
      <input
        className={css(styles.input)}
        name="file"
        id="file"
        type="file"
        onChange={(e) => handleImageChange(e)}
      />
      <label htmlFor="file">
        <Button raised component="span" color="primary">
          Добавить файл
        </Button>
      </label>
    </div>
  );
};

export default ImageUploader;
