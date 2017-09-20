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
      idsRegions: [],
      checked: [...this.props.defaultChecked],
      title: '',
      description: '',
      content: ''
    }
  }

  handleClickListItem = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
    this.props.updateRegions(this.state.checked);
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
        str += this.props.content[contentID].title + ', '
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
            aria-label="Регион"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary="Регион"
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
              {this.props.content[items[option].content[0]].title}
              {this.state.checked.indexOf(option._id) !== -1}
            </MenuItem>
          )}
        </Menu>
      </div>
    );
  }
}

export default ItemsSelector;
