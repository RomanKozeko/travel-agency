import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';


class ConfirmDialog extends Component {
  state = {
    open: this.props.show,
  };

  handleConfirm = () => {
    this.props.resolve();
    this.setState({ open: false });
  };

  handleRequestClose = () => {
    this.props.reject();
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>{this.props.title}</DialogTitle>
          <DialogContent style={{minWidth: '320px'}}>
            <DialogContentText>
              {this.props.body}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="secondary">
              Отмена
            </Button>
            <Button onClick={this.handleConfirm} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ConfirmDialog
