import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import { getContentByLanguage } from '../../services/utils';

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		marginLeft: '-10px',
		paddingTop: '20px',
		minWidth: '500px'
	},
	itemWrapper: {
		backgroundColor: '#fff',
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
		boxShadow: '0 2px 3px 2px rgba(0,0,0,.03)',
		borderRadius: '2px'
	},
  imgWrapper: {
	  backgroundColor: '#fff',
	  width: '100%',
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
	  zIndex: '5'
  },
	inner: {
		height: '100%',
		paddingTop: '100%',
		position: 'relative',
		display: 'flex',
		alignItems: 'center'
	},
	footer: {
		padding: '10px'
	},
	input: {
		width: '100%',
		border: '1px solid #dadada',
		borderRadius: '3px'
	},
	button: {
		width: '100%',
		marginTop: '10px',
    minWidth: '0px'
	},
  title: {
    whiteSpace: 'nowrap',
		padding: '0 10px'
  }
});

const MediaFilesList = ({
  items,
  clickHandler,
  languages = [],
  updateItem,
  isSaving,
  updateItemContent,
  filesType = '@image'
}) => {
  return (
    <div className={css(styles.container)}>
      {items.map(item => {
        return !filesType || item.type === filesType ?
          <div key={item._id} className={css(styles.itemWrapper)}>

            <div
              onClick={() => clickHandler(item)}
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
                  src={filesType === '@docs' ? '/admin/build/ic_insert_drive_file_black_24px.svg' : item.path }
                  alt=""
                />
              </div>
							<div className={css(styles.title)} title={ item.filename.slice(13)  }>{ item.filename.slice(13) }</div>
            </div>

            <div className={css(styles.footer)}>
              {
                languages.map(lang => {
                  const content = getContentByLanguage(item.content, lang._id)
                  return <div key={lang._id}>
                    {lang.title}
                    <input
                      type="text"
                      className={css(styles.input)}
                      onChange={({target}) => updateItemContent(item._id, lang._id, target.value)}
                      defaultValue={content && content.title}
                    />
                  </div>
                })
              }
              <Button
                onClick={() => updateItem(item)}
                type="submit"
                color="primary"
                className={css(styles.button)}
              >
                <Icon>save</Icon>
              </Button>
            </div>

          </div>
          : null
      })
      }
    </div>
  )
};

export default MediaFilesList;