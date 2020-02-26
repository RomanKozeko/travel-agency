import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

class AddPageItemMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: undefined,
      open: false,
    };
  }

  handleClick(event) {
    this.setState({ open: true, anchorEl: event.currentTarget });
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  addToursList = () => {
    this.props.openAddToursListPopup(this.props.item);
    this.handleRequestClose();
  };

  addGallery = () => {
    this.props.openMediaPopup(this.props.rowId);
    this.handleRequestClose();
  };

  addContactForm = () => {
    this.props.saveRow(this.props.rowId, '@contactForm');
    this.handleRequestClose();
  };

  render() {
    return (
      <div>
        <Button
          aria-owns="simple-menu"
          onClick={event => this.handleClick(event)}
        >
          Добавить контент
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={() => this.handleRequestClose()}
        >
          {!this.props.showGallaryOnly && (
            <MenuItem
              onClick={() => {
                this.handleRequestClose();
                return this.props.openHtmlEditor(this.props.item);
              }}
            >
              Добавить html контент
            </MenuItem>
          )}
          <MenuItem onClick={this.addGallery}>Добавить галерею</MenuItem>
          {!this.props.showGallaryOnly && (
            <MenuItem onClick={this.addContactForm}>
              Добавить контактную форму
            </MenuItem>
          )}
          {!this.props.showGallaryOnly && (
            <MenuItem onClick={this.addToursList}>
              Добавить список туров
            </MenuItem>
          )}
          {!this.props.showGallaryOnly && (
            <MenuItem onClick={this.handleRequestClose}>
              Добавить список отелей
            </MenuItem>
          )}
        </Menu>
      </div>
    );
  }
}

export default AddPageItemMenu;
