import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import ImageUploader from '../ui-elements/form/ImageUploader';

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		marginTop: '20px',
		marginLeft: '-10px'
	},
  imgWrap: {
	  backgroundColor: '#f8f8f8',
	  marginBottom: '10px',
    height: '200px',
	  marginLeft: '10px',
	  overflow: 'hidden',
	  '@media (min-width: 800px)': {
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
	  display: 'block',
	  minHeight: '200px',
	  width: '100%'
  }
});

const MediaFilesGallery = ({ items, saveItem }) => {
  return (
  	<div>
		  <ImageUploader uploadImg={saveItem} />
	    <div className={css(styles.container)}>
	      {items.map(item => (
	        <div  key={item._id} className={css(styles.imgWrap)}>
	          <img
	            className={css(styles.img)}
	            src={`http://localhost:3003${item.path}`}
	            alt=""
	          />
	        </div>
	        ))
	      }
	    </div>
	  </div>
  )
};

export default MediaFilesGallery;