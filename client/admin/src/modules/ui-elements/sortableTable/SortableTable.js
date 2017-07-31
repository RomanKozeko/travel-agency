import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

const SortableTable = ({data}) => {

  return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Заголовок</TableCell>
            <TableCell numeric>Calories</TableCell>
            <TableCell numeric>Fat (g)</TableCell>
            <TableCell numeric>Carbs (g)</TableCell>
            <TableCell numeric>Protein (g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell>
                  <a href="">{n.name}</a>
                </TableCell>
                <TableCell numeric>
                  {n.calories}
                </TableCell>
                <TableCell numeric>
                  {n.fat}
                </TableCell>
                <TableCell numeric>
                  {n.carbs}
                </TableCell>
                <TableCell numeric>
                  {n.protein}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
  );
};

SortableTable.propTypes = {
  data: PropTypes.array,
};

export default SortableTable;