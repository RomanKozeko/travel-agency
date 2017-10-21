import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import ImagePreview from '../ImagePreview';
import classNames from 'classnames';

const styles = StyleSheet.create({
  fileInput: {

  }
});

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: ''
    };
  }

  handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
    this.props.uploadImg(file);
  }

  render() {
    return (
      <div className="previewComponent">
        <input
          className={css(styles.fileInput)}
          type="file"
          name="file"
          onChange={(e) => this.handleImageChange(e)}
        />
        <ImagePreview url={this.state.imagePreviewUrl} />
      </div>
    );
  }
}

export default ImageUploader;
