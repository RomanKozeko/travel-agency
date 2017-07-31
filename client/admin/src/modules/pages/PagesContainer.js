import React, { Component } from 'react';
import classNames from 'classnames';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import PageHeader from '../ui-elements/PageHeader';
import Portlet from '../ui-elements/Portlet'
import SortableTable from '../ui-elements/sortableTable/SortableTable'

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const PagesContainer = () => (
  <div>
    <PageHeader text={'Все страницы'} />
    <Portlet isBordered={false}>
      <SortableTable data={data} />
    </Portlet>
  </div>
);

export default PagesContainer