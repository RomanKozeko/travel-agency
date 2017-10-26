import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Button from 'material-ui/Button';

const styles = StyleSheet.create({
  input: {
    display: 'none'
  }
});

class ImageUploader extends React.Component {
  handleImageChange(e) {
    e.preventDefault();
    const file = e.target.files[0];
    this.props.uploadImg(file);
  }

  render() {
    return (
      <div>
        <input
          className={css(styles.input)}
          name="file"
          id="file"
          type="file"
          onChange={(e) => this.handleImageChange(e)}
        />
        <label htmlFor="file">
          <Button raised component="span" color="primary">
            Добавить файл
          </Button>
        </label>
      </div>
    );
  }
}

export default ImageUploader;
