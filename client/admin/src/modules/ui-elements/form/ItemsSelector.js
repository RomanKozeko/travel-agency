import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import Menu, { MenuItem } from 'material-ui/Menu';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

class ItemsSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: undefined,
      open: false,
      checked: [...this.props.defaultChecked],
    }
  }

  handleClickListItem = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
    this.props.updateItems(
      this.props.itemsName,
      [...this.state.checked]
    );
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
    this.setState({
      checked: newChecked,
    });
  };

  getSelectedLabels = () => {
    let str = '';
    const items = this.props.items;
    this.state.checked.forEach(id => {
      if(items[id]) {
        const contentID = items[id].content[0];
        str += this.props.items[id].content[0].title + ', '
      }
    });
    return str.slice(0, -2);
  };

  render() {
    const {items} = this.props;
    return (
      <div>
        <List>
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label={this.props.itemsName}
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary={this.props.itemsName}
              secondary={this.state.checked.length > 0 ? this.getSelectedLabels() : "Не выбрано"}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {Object.keys(items).map((option, index) =>
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
          )}
        </Menu>
      </div>
    );
  }
}

export default ItemsSelector;
