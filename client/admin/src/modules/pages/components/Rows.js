import React from 'react';
import {css, StyleSheet} from 'aphrodite/no-important';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ItemContentType from './ItemContentType';

const styles = StyleSheet.create({
  row: {
    position: 'relative',
    width: '100%',
    border: '4px solid #aeaeae',
    borderTop: '23px solid #aeaeae',
    margin: '20px 0',
    padding: '15px 5px;'
  },
  rowInner: {
    border: '4px dashed #e6e6e6',
    padding: '20px',
    margin: '10px 5px;',
    display: 'flex',
    flexGrow: '1',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'border-color .3s ease',
    minHeight: '100px',
    ':hover': {
      border: '4px dashed #aeaeae',
    }
  },
  rowInnerActive: {
    border: '4px solid #aeaeae',
    position: 'relative',
    ':hover': {
      border: '4px solid #aeaeae',
    }
  },
  dragButton: {
    position: 'absolute',
    top: '-35px',
    left: '-16px'
  },
  closeButton: {
    position: 'absolute',
    top: '-35px',
    right: '-16px'
  },
  itemContent: {
    position: 'relative'
  },
  rowInnerContent: {
    width: '100%',
    overflow: 'hidden'
  }
});

const getRowItems = (items, rowItems) => items.map(item => rowItems[item.id || item._id]);

const getItemClassName = (item) => (
  item.type ? css(styles.rowInner, styles.rowInnerActive) : css(styles.rowInner)
);

const Rows = ({
    rows = [],
    rowsItems,
    langId,
    removeRow,
    openHtmlEditor,
    removeRowItem,
    editRowItem,
    openAddToursListPopup
  }) => {
  return (
    <div>
      <ReactCSSTransitionGroup
        transitionName="row"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        {rows.map(row => (
          <div key={row._id || row.id} className={css(styles.row)}>
            <IconButton className={css(styles.dragButton)}>
              <Icon>drag_handle</Icon>
            </IconButton>
            <IconButton
              className={css(styles.closeButton)}
              onClick={() => removeRow(langId, row._id || row.id)}
            >
              <Icon>close</Icon>
            </IconButton>
            <div className="clearfix">
              {
                getRowItems(row.items, rowsItems).map(item => (
                  <div key={item._id || item.id} className={item.size}>
                    <div className={getItemClassName(item)}>
                      <ItemContentType
                        item={item}
                        removeRowItem={removeRowItem}
                        editRowItem={editRowItem}
                        openHtmlEditor={openHtmlEditor}
                        openAddToursListPopup={openAddToursListPopup}
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        ))}
      </ReactCSSTransitionGroup>

    </div>
  );
};

export default Rows;
