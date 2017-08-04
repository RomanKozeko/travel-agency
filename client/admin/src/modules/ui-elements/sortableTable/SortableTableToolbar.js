import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from 'material-ui/Toolbar';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';

const SortableTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar>
      <div>
        {numSelected > 0
          ? <h4 type="subheading">Выбрано: {numSelected}</h4>
          : null}
      </div>
      <div>
        {numSelected > 0
          ? <IconButton aria-label="Delete" color="accent">
            <DeleteIcon />
          </IconButton>
          : null
        }
      </div>
    </Toolbar>
  );
};

SortableTableToolbar.propTypes = {
  numSelected: PropTypes.number
};

export default SortableTableToolbar;
