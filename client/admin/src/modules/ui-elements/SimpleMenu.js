import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

class SimpleMenu extends Component {
  state = {
    anchorEl: undefined,
    open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button aria-owns="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
          Добавить
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <MenuItem onClick={this.handleRequestClose}>Добавить галерею</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>Добавить список туров</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;