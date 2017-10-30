import React from 'react';
import Button from 'material-ui/Button';
import {css, StyleSheet} from 'aphrodite/no-important';
import Dialog, {
  DialogActions,
  DialogTitle,
  DialogContent
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import FilteredTagSelector from '../../ui-elements/FilteredTagSelector';
import TextField from 'material-ui/TextField';

const styles = StyleSheet.create({
  popup: {
    width: '600px'
  },
  input: {
    width: '100%'
  },
});


class AddToursListPopup extends React.Component {
  state = {
    title: '',
    subTitle: '',
    filters: {}
  };

  inputChange = (name) => (e) => {
    this.setState({
      [name]: e.target.value
    })
  };

  onFilterSelect = (filterType, filters) => {
    this.state.filters[filterType] = filters;
  };

  render() {
    const {isOpen, handleRequestClose, categories, regions, saveRow} = this.props;
    return (
      <Dialog open={isOpen} onRequestClose={handleRequestClose} transition={<Slide direction="up"/>}>
        <DialogTitle>Filter tours to display</DialogTitle>
        <DialogContent className={css(styles.popup)}>
          <TextField
            label="Header title"
            margin="normal"
            onChange={this.inputChange('title')}
            value={this.state.title}
            className={css(styles.input)}
          />
          <TextField
            label="Header sub title"
            margin="normal"
            onChange={this.inputChange('subTitle')}
            value={this.state.subTitle}
            className={css(styles.input)}
          />
          <FilteredTagSelector
            onFilterSelect={this.onFilterSelect}
            filterType='categories'
            items={categories}
            label='Select categories'
          />
          <FilteredTagSelector
            onFilterSelect={this.onFilterSelect}
            filterType='regions'
            items={regions}
            label='Select regions'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="accent">
            Cancel
          </Button>
          <Button onClick={() => saveRow('', 'tours', this.state)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default AddToursListPopup;