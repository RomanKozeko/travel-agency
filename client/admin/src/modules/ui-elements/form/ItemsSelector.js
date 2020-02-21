import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Menu, { MenuItem } from 'material-ui/Menu';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';

const styles = StyleSheet.create({
  root: {
    boxShadow: '0 1px 2px 1px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  listItem: {
    display: 'block',
  },
  chip: {
    margin: '10px',
  },
  row: {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
  },
});

class ItemsSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: undefined,
      open: false,
      checked: [...this.props.defaultChecked],
    };
  }

  handleClickListItem = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleToggle = (event, value) => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.props.updateItems(this.props.itemsName, newChecked);

    this.setState({
      checked: newChecked,
    });
  };

  getSelectedLabels = () => {
    const items = this.props.items;
    return (
      <div className={css(styles.row)}>
        {this.state.checked.map(
          (id, i) =>
            items[id] && (
              <Chip
                label={this.props.items[id].content[0].title}
                key={id}
                onDelete={e => this.handleToggle(e, id)}
                className={css(styles.chip)}
              />
            )
        )}
      </div>
    );
  };

  render() {
    const { items } = this.props;
    return (
      <div className={css(styles.root)}>
        <div>
          <List>
            <ListItem
              button
              aria-haspopup="true"
              aria-controls="lock-menu"
              aria-label={this.props.title}
              onClick={this.handleClickListItem}
            >
              <ListItemText
                className={css(styles.listItem)}
                primary={this.props.title}
                secondary={
                  this.state.checked.length > 0
                    ? this.getSelectedLabels()
                    : 'Не выбрано'
                }
              />
            </ListItem>
          </List>
        </div>
        <Menu
          id="lock-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleClose}
        >
          {Object.keys(items).map((option, index) => (
            <MenuItem
              key={index}
              onClick={event => this.handleToggle(event, option)}
            >
              <Checkbox
                checked={this.state.checked.indexOf(option) !== -1}
                tabIndex="-1"
                disableRipple
              />
              {this.props.items[option].content[0].title}
              {this.state.checked.indexOf(option._id) !== -1}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default ItemsSelector;
