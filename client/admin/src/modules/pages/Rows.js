import React from 'react';
import {css, StyleSheet} from 'aphrodite/no-important';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import AddPageItemMenu from './AddPageItemMenu';

const styles = StyleSheet.create({
  row: {
    height: '200px',
    position: 'relative',
    width: '100%',
    border: '4px solid #aeaeae',
    borderTop: '23px solid #aeaeae',
    margin: '20px 0',
    display: 'flex',
    padding: '0 5px;'
  },
  rowInner: {
    border: '4px dashed #e6e6e6',
    margin: '10px 5px;',
    display: 'flex',
    flexGrow: '1',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all .3s ease',
    ':hover': {
      border: '4px dashed #aeaeae',
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
});

const renderRows = (size) => {
  const splited = size.split('-');
  const count = 12 / +splited[splited.length - 1];
  const rows = [];
  for (let i = 0; i < count; i++) {
    rows.push(
      <div key={i} className={css(styles.rowInner)}>
        <AddPageItemMenu />
      </div>);
  }

  return rows;
};

const Rows = ({ rows, langId, removeRow }) => {
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
            {renderRows(row.size)}
          </div>
        ))}
      </ReactCSSTransitionGroup>

    </div>
  );
};

export default Rows;
