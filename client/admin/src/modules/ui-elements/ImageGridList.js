import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import {GridList, GridListTile} from 'material-ui/GridList';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    maxHeight: 850,
  },
  subheader: {
    width: '100%',
  },
});

function ImageGridList(imgs) {
  return (
    <div className={css(styles.root)}>
      <GridList cellHeight={160} className={css(styles.gridList)} cols={2}>
        {imgs.imgs.map((img, i) => (
          <GridListTile key={img._id + i} cols={1}>
            <img src={img.path}/>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

ImageGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ImageGridList;