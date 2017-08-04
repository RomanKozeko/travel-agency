import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from 'material-ui/Icon';
import { StyleSheet, css } from 'aphrodite/no-important';


const styles = StyleSheet.create({
  image: {
    maxWidth: '100%',
    width: '100%',
    border: '1px solid #e7ecf1',
    backgroundColor: '#fff',
    boxShadow: '0 2px 3px 2px rgba(0,0,0,.03);',
    marginTop: '0;',
    marginBottom: '25px;',
    borderRadius: '4px;',
  }
});

const ImagePreview = ({ url }) => (
  <img className={css(styles.image)} src={url} alt="" />
);

ImagePreview.propTypes = {
  url: PropTypes.string,
};

export default ImagePreview