import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

class AddPageItemMenu extends Component {
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
        <Button aria-owns="simple-menu" onClick={this.handleClick}>
          Добавить контент
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <MenuItem onClick={this.handleRequestClose}>Добавить галерею</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>Добавить картнику</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>Добавить список туров</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>Добавить список отелей</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default AddPageItemMenu;