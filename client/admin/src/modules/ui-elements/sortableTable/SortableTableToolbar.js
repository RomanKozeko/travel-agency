import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from 'material-ui/Toolbar';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import {StyleSheet, css} from 'aphrodite/no-important';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#ff4081',
    padding: '10px 20px',
    borderRadius: '4px 4px 0 0'
  },
  header: {
    color: '#fff'
  }
})
const SortableTableToolbar = (props) => {
  const { numSelected, deletePages } = props;

  return (
    <div>
      {numSelected > 0
        ?
        <div className={css(styles.wrapper)}>
          <h4 className={css(styles.header)} type="subheading">Выбрано: {numSelected}</h4>
          <IconButton aria-label="Delete">
            <DeleteIcon onClick={() => ({})}
            />
          </IconButton>
        </div>
        : null}
    </div>
  );
};

SortableTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  deletePages: PropTypes.func
};

export default SortableTableToolbar;
