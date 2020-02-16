import React from 'react';
import PropTypes from 'prop-types';
import './GridIcons.css';

const renderCollumns = count => {
  const columns = [];
  for (let i = 0; i < count; i++) {
    columns.push(<div key={i} className="Grid-icons__inner" />);
  }

  return columns;
};

const GridIcons = ({ count, clickHandler }) => {
  return (
    <div className="Grid-icons" onClick={() => clickHandler(count)}>
      {renderCollumns(count)}
    </div>
  );
};

GridIcons.propTypes = {
  count: PropTypes.number,
  clickHandler: PropTypes.func,
};

export default GridIcons;
