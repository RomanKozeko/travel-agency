import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    height: '30px',
  },
});

class ActionsMenu extends Component {
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
        <Button
          aria-owns="simple-menu"
          aria-haspopup="true"
          className={css(styles.button)}
          onClick={this.handleClick}
        >
          Новое действие
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleRequestClose}
        >
          <MenuItem onClick={this.handleRequestClose}>
            Добавить страницу
          </MenuItem>
          <MenuItem onClick={this.handleRequestClose}>Добавить тур</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>Добавить отель</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default ActionsMenu;
