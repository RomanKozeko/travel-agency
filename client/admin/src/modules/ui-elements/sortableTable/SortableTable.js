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

class SortableTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selected: {}, isSelectedAll: false };
    this.countSelected = this.countSelected.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.deletePages = this.deletePages.bind(this);
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

  deletePages() {
    const pagesToDelete = Object.keys(this.state.selected).filter(
      id => (this.state.selected[id] === true)
    );

    this.props.deletePages(pagesToDelete);
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
    if (item.content) {
      //  get all content of curr item
      const contentForCurrLang = item.content.find((itemContent) => {
        const itemContentLang = data.content[itemContent].language;

        return data.languages.byIds[itemContentLang].prefix === data.languages.currLanguage;
      });

      return data.content[contentForCurrLang];
    }
    return item;
  }


  renderFields(item, fields) {
    return fields.map((field, i) => (
      <TableCell key={item._id + i}>
        {field.isLink
          ?
          <Link to={field.linkPrefix + item._id}>{this.getItemContent(item)[field.name]}</Link>
          :
          <span>{() => this.getItemContent(item)[field.name]}</span>
        }
      </TableCell>
    ));
  }

  render() {
    const { data } = this.props;

    return (
      <div>
        <SortableTableToolbar numSelected={this.countSelected()} deletePages={this.deletePages} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell checkbox className={css(styles.actions)}>
                <Checkbox checked={this.state.isSelectedAll} onChange={(e, checked) => this.handleSelectAllClick(e, checked)}  />
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