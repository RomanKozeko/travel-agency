import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from 'material-ui/Icon';
import { StyleSheet, css } from 'aphrodite/no-important';
import classNames from 'classnames';

const opacityKeyframes = {
  'from': {
    opacity: 0,
  },

  'to': {
    opacity: 1,
  }
};

const translateKeyframes = {
  '0%': {
    transform: 'translateX(0)',
  },

  '50%': {
    transform: 'translateX(100px)',
  },

  '100%': {
    transform: 'translateX(0)',
  },
};

const pulse = {
  'from': {
    backgroundPosition: '0% 0%',
  },

  'to': {
    backgroundPosition: ' -135% 0%',
  }
};


const styles = StyleSheet.create({
  image: {
    maxWidth: '100%',
    width: '100%',
    backgroundColor: '#fff',
    boxShadow: '0 2px 3px 2px rgba(0,0,0,.03);',
    marginTop: '0;',
    borderRadius: '4px;',
    animationName: [opacityKeyframes],
    animationDuration: '.3s',
    position: 'absolute',
    left: '0',
    top: '0',
    zIndex: '2',
  },
  wrapper: {
    position: 'relative',
    marginBottom: '25px;',
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    backgroundColor: '#dadada',
    paddingTop: '100%',
    borderRadius: '4px;',
  },
  layer: {
    backgroundImage: 'linear-gradient(-90deg, #fff 0%, rgba(230,230,230, .4) 50%, #fff 100%)',
    backgroundSize: '400% 400%;',
    animationName: [pulse],
    animationDuration: '3s, 1200ms',
    animationIterationCount: 'infinite',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '1',
    opacity: '0.6',
    borderRadius: '4px;',
  }

});


class ImagePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  onLoad() {
    this.setState({ loaded: true });
  }

  render() {
    const imgClass = classNames({
      [css(styles.image)]: !this.state.loaded,
      [css(styles.image, styles.imageLoaded)]: this.state.loaded
    });
    const src = this.props.url || '/landscape.svg';
    return (
      <div className={css(styles.wrapper)}>
        {!this.state.loaded && <div className={css(styles.layer)} />}
        {this.state.loaded && <img className={css(styles.image)} src={src} alt="" />}
        {!this.state.loaded && <img style={{display: 'none'}} src={src} onLoad={this.onLoad.bind(this)} />}
      </div>
    )
  }
}

ImagePreview.propTypes = {
  url: PropTypes.string,
};

export default ImagePreview;
