import React from 'react';
import PropTypes from 'prop-types';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import {StyleSheet, css} from 'aphrodite/no-important';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const styles = StyleSheet.create({
  actions: {
    width: '100px'
  }
});

const SortableTable = ({data}) => {

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Заголовок</TableCell>
          <TableCell numeric>Категория</TableCell>
          <TableCell numeric className={css(styles.actions)}>Действия</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(n => {
          return (
            <TableRow key={n.id}>
              <TableCell>
                <Link to="/pages/id">{n.name}</Link>
              </TableCell>
              <TableCell numeric>
                {n.calories}
              </TableCell>
              <TableCell>
                <IconButton>
                  <Icon>create</Icon>
                </IconButton>
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