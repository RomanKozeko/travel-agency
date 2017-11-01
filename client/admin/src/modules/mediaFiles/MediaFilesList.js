import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Icon from 'material-ui/Icon';

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		marginTop: '20px',
		marginLeft: '-10px',
		paddingTop: '20px'
	},
  imgWrapper: {
	  backgroundColor: '#f8f8f8',
	  marginBottom: '10px',
	  marginLeft: '10px',
	  overflow: 'hidden',
	  width: '100%',
	  '@media (min-width: 600px)': {
		  width: 'calc(100% / 2 - 10px)',
	  },
	  '@media (min-width: 1000px)': {
		  width: 'calc(100% / 4 - 10px)',
	  },
	  '@media (min-width: 1200px)': {
		  width: 'calc(100% / 6 - 10px)',
	  },
	  boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
	  borderRadius: '2px'
  },
  img: {
		position: 'absolute',
	  display: 'block',
	  width: '100%',
	  top: '50%',
	  transform: 'translateY(-50%)',
		left: '0',
	  maxHeight: '100%'
  },
  active: {
		position: 'relative',
	  border: '2px solid #5b9bd1',
  },
	iconWrapper: {
		position: 'absolute',
	  top: '0',
	  right: '0',
	  color: '#fff;',
		width: '25px',
		height: '25px',
	  background: '#1678cc',
	  zIndex: '10000'
  },
	inner: {
		height: '100%',
		paddingTop: '100%',
		position: 'relative',
		display: 'flex',
		alignItems: 'center'
	}
});

const MediaFilesList = ({ items, clickHandler }) => {
  return (
    <div className={css(styles.container)}>
      {items.map(item => (
        <div
	        key={item._id}
	        onClick={() => clickHandler(item._id)}
	        className={item.active ? css(styles.imgWrapper, styles.active) : css(styles.imgWrapper)}
        >
	        {item.active &&
		        <div className={css(styles.iconWrapper)}>
			        <Icon>check</Icon>
		        </div>
	        }
	        <div className={css(styles.inner)}>
		        <img
			        className={css(styles.img)}
			        src={item.path}
			        alt=""
		        />
	        </div>

        </div>
        ))
      }
    </div>
  )
};

export default MediaFilesList;