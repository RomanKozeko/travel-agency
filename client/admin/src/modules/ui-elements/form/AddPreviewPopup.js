import React, { Component } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import Button from 'material-ui/Button';
import MediaFilesContainer from '../../mediaFiles/MediaFilesContainer';
import Dialog, { DialogActions,	DialogContent } from 'material-ui/Dialog';

const styles = StyleSheet.create({
  button: {
    display: 'block',
    textAlign: 'center',
    width: '100%',
    marginBottom: '15px'
  }
});

class AddPreviewPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selectedPreviewItems: []
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleClick = () => {
    this.props.addPreview(this.state.selectedPreviewItems);
    this.state.selectedPreviewItems = [];
    this.handleRequestClose();
  };

  handleToggledItem = (img) => {
    const selectedPreview = [ ...this.state.selectedPreviewItems ];
    const index = selectedPreview.findIndex(item => item._id === img._id);

    if (index === -1) {
      selectedPreview.push({...img});
    } else {
      selectedPreview.splice(index, 1);
    }

    this.setState({
      selectedPreviewItems: selectedPreview
    });
  };

  render() {
    return (
      <div>
        <Button
          className={css(styles.button)}
          onClick={this.handleClickOpen}
          component="span"
          raised
        >
          Добавить картинок
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogContent>
            <MediaFilesContainer handleToggledItem={this.handleToggledItem} />
          </DialogContent>
          <DialogActions>
            <Button raised onClick={this.handleClick} color="primary">
              Добавить
            </Button>
            <Button onClick={this.handleRequestClose} color="primary" autoFocus>
              Отмена
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default AddPreviewPopup;
