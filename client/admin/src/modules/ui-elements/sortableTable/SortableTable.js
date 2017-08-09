import React from 'react';
import PropTypes from 'prop-types';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Link } from 'react-router-dom';

import SortableTableToolbar from './SortableTableToolbar';

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

class SortableTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selected: {} };
  }

  handleSelectAllClick(event, checked) {
    const selected = { ...this.state.selected };

    this.props.data.items.forEach((item) => {
      selected[item._id] = checked;
    });
    this.setState({ selected });
  }

  handleSelect(event, checked, id) {
    const selected = { ...this.state.selected };
    selected[id] = checked;
    this.setState({ selected });
  }

  isSelected(id) {
    return !!this.state.selected[id];
  }

  countSelected() {
    let counter = 0;
    const selected = Object.keys(this.state.selected);
    selected.forEach((item) => {
      if (this.state.selected[item]) {
        counter += 1;
      }
    });
    return counter;
  }

  render() {
    const { data } = this.props;

    return (
      <div>
        <SortableTableToolbar numSelected={this.countSelected.bind(this)()} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell checkbox>
                <Checkbox onChange={(e, checked) => this.handleSelectAllClick(e, checked)} />
              </TableCell>
              {data.headers.map((item, i) => (
                <TableCell key={i + 1}>{item}</TableCell>
              ))
              }
              <TableCell numeric className={css(styles.actions)}>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.items.map(item => (
              <TableRow key={item._id}>
                <TableCell checkbox>
                  <Checkbox
                    onChange={(e, checked) => this.handleSelect(e, checked, item._id)}
                    checked={this.isSelected.bind(this)(item._id)}
                  />
                </TableCell>
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
      </div>
    );
  }
}

SortableTable.propTypes = {
  data: PropTypes.object
};

export default SortableTable;