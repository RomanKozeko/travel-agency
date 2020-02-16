import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import { compose, withStateHandlers, lifecycle } from 'recompose';
import { getContentByLanguage } from '../../services/utils';
import { LeftArrow, RightArrow } from './icons/Icons';
import { theme } from '../../services/constans';

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: '300px',
  },
  img: {
    maxWidth: '100%',
    minWidth: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
  },
  imgWrapper: {
    position: 'relative',
  },
  description: {
    color: '#fff',
    background: 'rgba(0,0,0,.25)',
    padding: '10px',
    position: 'absolute',
    left: '0',
    bottom: '0px',
    width: '100%',
  },
  controls: {
    position: 'absolute',
    zIndex: '2',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    cursor: 'pointer',
    background: 'rgba(0,0,0,0.25)',
    opacity: '0.5',
    ':hover': {
      opacity: '1',
    },
  },
  controlsRight: {
    position: 'absolute',
    right: '10px',
    width: '60px',
    height: '60px',
    zIndex: '2',
    borderRadius: '50%',
    cursor: 'pointer',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.25)',
    opacity: '0.5',
    ':hover': {
      opacity: '1',
    },
  },
  headerTitle: {
    lineHeight: '27px',
    fontSize: '38px',
    fontWeight: 'bold',
    color: '#fefefe',
    textTransform: 'uppercase',
  },
  imgPlaceHolder: {
    opacity: '0',
    maxWidth: '100%',
    minWidth: '100%',
  },
});

const ImageSlider = ({
  images,
  languageID,
  currIndex,
  nextSlide,
  prevSlide,
  hover,
  mouseLeave,
}) => (
  <div
    className={css(styles.wrapper)}
    onMouseEnter={hover}
    onMouseLeave={mouseLeave}
  >
    {images.length > 1 ? (
      <div>
        <div className={css(styles.controls)} onClick={prevSlide}>
          <LeftArrow color={theme.colors.primary} />
        </div>
        <div className={css(styles.controlsRight)} onClick={() => nextSlide()}>
          <RightArrow color={theme.colors.primary} />
        </div>
      </div>
    ) : null}
    {images.map((img, index) => {
      if (!img || index !== currIndex) {
        return null;
      }
      return (
        <img
          className={css(styles.imgPlaceHolder)}
          src={img.path}
          key={img._id}
        />
      );
    })}

    {images.map((img, index) => {
      if (!img || index !== currIndex) {
        return null;
      }
      const content = getContentByLanguage(img.content, languageID);
      return (
        <div key={img._id}>
          <img className={css(styles.img)} src={img.path} alt="" />
          <div className={css(styles.description)}>
            {content && content.title}
          </div>
        </div>
      );
    })}
  </div>
);

const mapStateToProps = state => {
  return {
    languageID: state.app.languages.urlPrefix,
  };
};

export default compose(
  connect(mapStateToProps),
  withStateHandlers(
    ({ images }) => {
      return {
        currIndex: 0,
        isHovered: false,
        imgCount: images.length - 1,
      };
    },
    {
      nextSlide: ({ currIndex, imgCount, isHovered }) => fromTimer => {
        if (fromTimer && isHovered) {
          return {
            currIndex,
          };
        }

        return {
          currIndex:
            currIndex !== 0 && currIndex % imgCount === 0 ? 0 : currIndex + 1,
        };
      },
      prevSlide: ({ currIndex, imgCount }) => e => {
        return {
          currIndex:
            currIndex === 0 && currIndex % imgCount === 0
              ? imgCount
              : currIndex - 1,
        };
      },
      hover: () => () => ({
        isHovered: true,
      }),
      mouseLeave: () => () => ({
        isHovered: false,
      }),
    }
  ),
  lifecycle({
    componentDidMount() {
      if (this.props.images.length > 1) {
        setInterval(() => {
          this.props.nextSlide(true);
        }, 5000);
      }
    },
  })
)(ImageSlider);
