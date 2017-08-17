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
    border: '1px solid #e7ecf1',
    backgroundColor: '#fff',
    boxShadow: '0 2px 3px 2px rgba(0,0,0,.03);',
    marginTop: '0;',
    borderRadius: '4px;',
    animationName: [opacityKeyframes],
    animationDuration: '1.3s',
  },
  imagePreview: {
    maxWidth: '100%',
    width: '100%',
    opacity: '0.2'
  },
  wrapper: {
    position: 'relative',
    marginBottom: '25px;',
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
    setTimeout(() => {
      this.setState({ loaded: true });
    }, 300);
  }

  render() {
    const imgClass = classNames({
      [css(styles.image)]: !this.state.loaded,
      [css(styles.image, styles.imageLoaded)]: this.state.loaded
    });
    return (
      <div className={css(styles.wrapper)}>
        {this.state.loaded &&
          <img
            className={css(styles.image)}
            src={this.props.url}
            alt=""
          />
        }
        {!this.state.loaded &&
          <div>
            <div className={css(styles.layer)}/>
            <img
              className={css(styles.imagePreview)}
              src="/landscape.svg"
              alt=""
            />
            <div style={{display: 'none'}}>
              <img
                src={this.props.url}
                alt=""
                onLoad={this.onLoad.bind(this)}
              />
            </div>
          </div>
        }

      </div>
    )
  }
}

ImagePreview.propTypes = {
  url: PropTypes.string,
};

export default ImagePreview;
