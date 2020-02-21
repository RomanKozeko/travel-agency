import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import Icon from 'material-ui/Icon';

const styles = StyleSheet.create({
  gridList: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '20px',
    marginLeft: '-10px',
    paddingTop: '20px',
  },
  gridListItem: {
    backgroundColor: '#fff',
    marginBottom: '10px',
    marginLeft: '10px',
    overflow: 'hidden',
    width: 'calc(100% / 2 - 10px)',
    boxShadow: '0 1px 2px 1px rgba(0,0,0,0.1)',
    borderRadius: '2px',
  },
  active: {
    position: 'relative',
    border: '2px solid #5b9bd1',
  },
  imgWrapper: {
    height: '100%',
    paddingTop: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  img: {
    position: 'absolute',
    display: 'block',
    width: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    left: '0',
    maxHeight: '100%',
  },
  iconWrapper: {
    position: 'absolute',
    top: '0',
    right: '0',
    color: '#fff;',
    width: '25px',
    height: '25px',
    background: '#1678cc',
    zIndex: '5',
  },
});

function ImageGridList({ imgs, clickHandler }) {
  return (
    <div className={css(styles.gridList)}>
      {imgs.map(item => (
        <div
          key={item._id + 1}
          onClick={() => clickHandler(item)}
          className={
            item.active
              ? css(styles.gridListItem, styles.active)
              : css(styles.gridListItem)
          }
        >
          {item.active && (
            <div className={css(styles.iconWrapper)}>
              <Icon>check</Icon>
            </div>
          )}
          <div className={css(styles.imgWrapper)}>
            <img
              className={css(styles.img)}
              src={item.path}
              alt={item.title || ''}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

ImageGridList.propTypes = {
  imgs: PropTypes.array,
  clickHandler: PropTypes.func,
};

export default ImageGridList;
