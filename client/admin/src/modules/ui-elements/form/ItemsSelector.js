import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import Menu, { MenuItem } from 'material-ui/Menu';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';

const styles = StyleSheet.create({
  listItem: {
    display: 'block'
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

    this.props.updateItems(
      this.props.itemsName,
      newChecked
    );

    this.setState({
      checked: newChecked,
    });

  };

  getSelectedLabels = () => {
    const items = this.props.items;
    return (
      <div className={css(styles.row)}>
        {this.state.checked.map((id, i) =>
          items[id] &&
          <Chip
            label={this.props.items[id].content[0].title}
            key={id}
            onRequestDelete={(e) => this.handleToggle(e, id)}
            className={css(styles.chip)}
          />
        )}
      </div>
    )
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
              className={css(styles.listItem)}
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
