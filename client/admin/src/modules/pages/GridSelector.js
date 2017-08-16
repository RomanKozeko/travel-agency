import React from 'react';
import PropTypes from 'prop-types';
import GridIcons from '../ui-elements/gridIcons/GridIcons';

const GridSelector = ({ count, clickHandler }) => {
  const rows = [];
  for (let i = 0; i < count; i++) {
    rows.push(
      <div key={i} className="col-sm-3">
        <GridIcons count={i + 1} clickHandler={() => clickHandler(count)} />
      </div>);
  }

  return  <div className="row">{rows}</div>;
};

GridSelector.propTypes = {
  count: PropTypes.number,
  clickHandler: PropTypes.func,
};

export default GridSelector;
