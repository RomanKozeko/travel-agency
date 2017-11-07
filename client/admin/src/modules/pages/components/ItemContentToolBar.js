import React from 'react';
import {css, StyleSheet} from 'aphrodite/no-important';
import Icon from 'material-ui/Icon';
import DeleteIcon from 'material-ui-icons/Delete';

const styles = StyleSheet.create({
  itemContentButton: {
    color: '#aeaeae',
    cursor: 'pointer',
    ':hover': {
      color: '#3f51b5'
    }
  },
  itemContentToolbar: {
    position: 'absolute',
    top: '0',
    right: '0',
  }
});


const ItemContentToolBar = ({item, removeRowItem, editRowItem}) => (
  <div className={css(styles.itemContentToolbar)}>
    <DeleteIcon
      className={css(styles.itemContentButton)}
      onClick={() => removeRowItem(item._id || item.id)}
    />
    <Icon
      className={css(styles.itemContentButton)}
      onClick={() => editRowItem(item._id || item.id)}
    >
      mode_edit
    </Icon>
  </div>
);

export default ItemContentToolBar