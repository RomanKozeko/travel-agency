import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import { compose, lifecycle, withStateHandlers } from 'recompose'
import { theme } from '../../services/constans'
import PrefixLink from '../ui-elements/PrefixLink';
import { LeftArrow, RightArrow } from '../ui-elements/icons/Icons'

const fadeTopKeyframes = {
  'from': {
    opacity: 0,
    transform: 'translateY(-50px)'
  },

  'to': {
    opacity: 1,
    transform: 'translateY(0)'
  }
};


const styles = StyleSheet.create({
  sliderContainer: {
    height: '500px',
    position: 'relative',
    '@media (min-width: 1300px)': {
      height: '700px',
    },
  },
  wrapper: {
	  position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
	  background: '#333',
    backgroundImage: 'url(/web/build/DSC_0200.JPG)',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
	  '@media (min-width: 1300px)': {
		  height: '700px',
	  },
  },
  title: {
    lineHeight: '30px',
    fontSize: '22px',
    textTransform: 'uppercase',
  },
  sliderWrapper: {
	  position: 'relative',
    animationName: [fadeTopKeyframes],
    animationDuration: '.3s, 300ms',
  },
  titleMain: {
    lineHeight: '35px',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#fefefe',
    textTransform: 'uppercase',
    '@media (min-width: 600px)': {
      lineHeight: '45px',
      fontSize: '38px',
    }
  },
  titleSpan: {
    color: theme.colors.primary,
    fontSize: '32px;'
  },
  text: {
    marginBottom: '20px;'
  },
  btn: {
    display: 'inline-block',
    color: '#fff',
    textTransform: 'uppercase',
    lineHeight: '40px',
    minWidth: '150px',
    marginBottom: '20px;',
    padding: '5px 20px',
    boxSizing: 'border-box',
    transition: 'all .3s ease',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: theme.colors.primary,
    outline: 'none',
    textAlign: 'center',
    ':hover': {
      color: '#fff',
      textDecoration: 'none',
      backgroundColor: theme.colors.primaryAccent
    }
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
    }
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
    }
  }
});

const PhotoSlider = ({ items, prevSlide, nextSlide, hover, mouseLeave, currIndex }) => {
  return (
    <div className={css(styles.sliderContainer)}  onMouseEnter={ hover } onMouseLeave={ mouseLeave }>
      {
        items.length > 1 &&
        <div>
          <div className={css(styles.controls)} onClick={ prevSlide }>
            <LeftArrow color={ theme.colors.primary } />
          </div>
          <div className={css(styles.controlsRight)} onClick={ () => nextSlide() } >
            <RightArrow color={ theme.colors.primary }/>
          </div>
        </div>
      }
      {
        items.map((item, index) => {
          if (index !== currIndex) {
            return null
          }
          return (
            <div className={css(styles.wrapper)} key={ item._id } style={{ backgroundImage: `url('${item.image}'`}}>
              <div className="container">
                <div className={css(styles.sliderWrapper)}>
                  <h2 className={css(styles.titleMain)} style={{ color: item.color }}>
                    {
                      item.content.title
                    }
                  </h2>
                  <p className={css(styles.text)} style={{ color: item.color }}>
                    {
                      item.content.description
                    }
                  </p>
                  <PrefixLink to={ `/pages/${item.link}` } className={css(styles.btn)}>
                    { window.TA.content.moreInfo }
                  </PrefixLink>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
};

export default compose(
  withStateHandlers(
    ({ items }) => {
      return {
        currIndex: 0,
        isHovered: false,
        imgCount: items.length - 1
      }
    },
    {
      nextSlide: ({ currIndex, imgCount, isHovered }) => (fromTimer) => {
        if (fromTimer && isHovered) {
          return {
            currIndex
          }
        }

        return {
          currIndex: (currIndex !== 0 && currIndex % imgCount === 0) ? 0 : currIndex + 1
        }
      },
      prevSlide: ({ currIndex, imgCount }) => (e) => {
        return {
          currIndex: (currIndex === 0 && currIndex % imgCount === 0) ? imgCount : currIndex - 1
        }
      },
      hover: () => () => ({
        isHovered: true
      }),
      mouseLeave: () => () => ({
        isHovered: false
      })
    }
  ),
  lifecycle({
    componentDidMount() {
      if (this.props.items.length > 1) {
        setInterval(() => {
          this.props.nextSlide(true)
        }, 5000)
      }

    }
  }),
)(PhotoSlider)
