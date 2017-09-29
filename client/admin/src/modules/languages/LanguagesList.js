import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import PageHeader from '../ui-elements/PageHeader';
import Portlet from '../ui-elements/Portlet';
import ConfirmDialog  from '../ui-elements/form/ConfirmDialog'
import createConfirmation  from '../ui-elements/form/createConfirmation'
const uniqueId = require('lodash.uniqueid');



const confirm = createConfirmation(ConfirmDialog);

const styles = StyleSheet.create({
  actions: {
    textAlign: 'right'
  },
  field: {
    width: '300px'
  }
});

const renderCells = ({ title, prefix }, id, selectedRow, handleChange) => {
  if (selectedRow === id) {
    return [
      <TableCell key={id} className={css(styles.field)}>
        <TextField value={title} label="title" onChange={(e) => handleChange(e, 'title', id)} />
      </TableCell>,
      <TableCell key={id + 1} className={css(styles.field)}>
        <TextField value={prefix} label="prefix" onChange={(e) => handleChange(e, 'prefix', id)} />
      </TableCell>
    ];
  }
  return [
    <TableCell key={id + 2} className={css(styles.field)}>{title}</TableCell>,
    <TableCell key={id + 3} className={css(styles.field)}>{prefix}</TableCell>
  ];
};

class LanguagesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: null,
      items:  [...this.props.items]
    };

    this.handleChange = this.handleChange.bind(this)
  }

  editRow = (selectedRow) => event => {
    this.setState({selectedRow})
  };

  cancelEdit = () => {
    this.setState({selectedRow: null})
  };

  deleteRow = (item) => event => {
    const id = item._id || item.id;
    confirm({title: `Are you sure to delete ${item.title} language?`, body: ''}).then((res) => {
      const items = [...this.state.items];
      const index = items.findIndex(row => row._id === id || row.id === id);

      items.splice(index, 1);
      if (item._id) {
        this.props.deleteLang([item._id])
      }
      this.setState({items});
    })

  };

  addRow = () => {
    const items = [...this.state.items];
    const id = uniqueId();
    items.push({
      title: '',
      prefix: '',
      id
    });
    this.setState({selectedRow: id, items});
  };

  handleChange(event, name, id) {
    const items = [...this.state.items];
    const index = items.findIndex(item => (item._id === id || item.id === id));
    items[index][name] = event.target.value;
    this.setState({items});
  };

  render() {
    const { saveLang, isSaving, deleteLang } = this.props;
    return (
      <div>
        <PageHeader text={'Языки'} />
        <Button
          raised
          color="primary"
          className="addBottomMargin"
          onClick={this.addRow}
        >
          Добавить язык
        </Button>
        <Portlet isBordered={false}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Заголовок</TableCell>
                <TableCell>Префикс</TableCell>
                <TableCell className={css(styles.actions)}>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.items.map(item => (
                <TableRow key={item._id || item.id}>
                  {renderCells(item, item._id || item.id, this.state.selectedRow, this.handleChange)}
                  <TableCell className={css(styles.actions)}>
                    {this.state.selectedRow === item._id || this.state.selectedRow === item.id
                      ?
                      <div>
                        {isSaving ? 'Saving..' :
                        <IconButton onClick={() => saveLang(item, !!item.id)}>
                          <Icon>save</Icon>
                        </IconButton>
                        }
                        <IconButton onClick={this.cancelEdit}>
                          <Icon>cancel</Icon>
                        </IconButton>
                      </div>
                      :
                      <div>
                        <IconButton onClick={this.editRow(item._id || item.id)}>
                          <Icon>create</Icon>
                        </IconButton>
                        {this.state.items.length > 2 &&
                        <IconButton onClick={this.deleteRow(item)}>
                          <Icon>delete</Icon>
                        </IconButton>
                        }
                      </div>
                    }
                  </TableCell>
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
        </Portlet>
      </div>
    );
  }
}

LanguagesList.propTypes = {
  items: PropTypes.array,
  isFetching: PropTypes.bool,
};

export default LanguagesList;
