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

const renderFileds = (item, fields) => {
  return fields.map((field, i) => (
    <TableCell key={item._id + i}>
      {field.isLink
        ?
        <Link to={field.linkPrefix + item._id}>{item.content[0][field.name]}</Link>
        :
        <span>{item.content[0][field.name]}</span>
      }
    </TableCell>
  ))
};

const SortableTable = ({ data }) => {

  return (
    <Table>
      <TableHead>
        <TableRow>
          {data.headers.map((item, i) => (
            <TableCell key={i + 1}>{item}</TableCell>
          ))
          }
          <TableCell numeric className={css(styles.actions)}>Действия</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.pages.map(item => (
          <TableRow key={item._id}>
            {renderFileds(item, data.fields)}
            <TableCell>
              <IconButton>
                <Icon>create</Icon>
              </IconButton>
            </TableCell>
          </TableRow>
        ))
        }
      </TableBody>
    </Table>
  );
};

SortableTable.propTypes = {
  data: PropTypes.object
};

export default SortableTable;