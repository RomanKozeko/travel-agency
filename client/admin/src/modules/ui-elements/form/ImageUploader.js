import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Button from 'material-ui/Button';

const styles = StyleSheet.create({
  input: {
    display: 'none'
  }
});

const ImageUploader = ({ uploadImg }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    uploadImg(file);
  };

  return (
    <div>
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
