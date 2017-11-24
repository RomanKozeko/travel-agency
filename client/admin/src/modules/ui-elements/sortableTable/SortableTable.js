import React from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Link } from 'react-router-dom';
import Switch from 'material-ui/Switch';
import StarsList from '../StarsList';

import SortableTableToolbar from './SortableTableToolbar';

const styles = StyleSheet.create({
  actions: {
    width: '100px'
  },
  disabled: {
    backgroundColor: '#eee'
  }
});

class SortableTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selected: {}, isSelectedAll: false };
    this.countSelected = this.countSelected.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.deleteItemss = this.deleteItemss.bind(this);
  }

  handleSelectAllClick(event, checked) {
    const selected = { ...this.state.selected };

    this.props.data.items.forEach((item) => {
      selected[item._id] = checked;
    });
    this.setState({ selected, isSelectedAll: checked });
  }

  handleSelect(event, checked, id) {
    const selected = { ...this.state.selected };
    selected[id] = checked;
    this.setState({ selected, isSelectedAll: false });
  }

  isSelected(id) {
    return !!this.state.selected[id];
  }

  getSelectedIDs() {
    return Object.keys(this.state.selected);
  }

  deleteItemss() {
    const pagesToDelete = Object.keys(this.state.selected).filter(
      id => (this.state.selected[id] === true)
    );

    this.props.deleteItems(pagesToDelete);
    this.setState({
      selected: {},
      isSelectedAll: false
    });
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

  getItemContent(item) {
    const { data } = this.props;
    //  get all content of curr item
    return item.content ?
      item.content.find((itemContent) => {
        if (!data.languages.byIds[itemContent.language]) {
          return false;
        }
        return data.languages.byIds[itemContent.language].prefix === data.languages.currLanguage;
      })
    :
    item;
  }

  renderFields(item, fields) {
    return fields.map((field, i) => (
      <TableCell key={item._id + i}>
        {this.renderCellItem(item, field)}
      </TableCell>
    ));
  }

  renderCellItem(item, field) {
    switch (field.isLink) {
      case 'toggle': {
        return <Switch checked={item[field.name]} />
      }
      case 'date': {
        return <span>{moment(item.date).format('DD/MM/YYYY')}</span>
      }
      case 'stars': {
        return <StarsList starsCount={item.stars} />
      }
      case true: {
        return <Link to={field.linkPrefix + item._id}>{this.getItemContent(item)[field.name]}</Link>
      }
      default: {
       return <span>{this.getItemContent(item)[field.name]}</span>
      }
    }
  }

  render() {
    const { data } = this.props;

    return (
      <div>
        <SortableTableToolbar numSelected={this.countSelected()} deletePages={this.deleteItemss} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={css(styles.actions)}>
                <Checkbox
                  checked={this.state.isSelectedAll}
                  onChange={(e, checked) => this.handleSelectAllClick(e, checked)}
                />
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
              <TableRow key={item._id} className={item.enabled !== false ? '' : css(styles.disabled)}>
                <TableCell>
                  <Checkbox
                    onChange={(e, checked) => this.handleSelect(e, checked, item._id)}
                    checked={this.isSelected(item._id)}
                  />
                </TableCell>
                {this.renderFields(item, data.fields)}
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
  data: PropTypes.object,
  languages: PropTypes.object,
  deletePages: PropTypes.func
};

export default SortableTable;