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
  constructor(props) {
    super(props);
    this.state = {
      filtersObj: this.props.currRowItem.filtersObj || {}
    }
  }


  inputChange = (name) => (e) => {
    this.setState({
      [name]: e.target.value
    })
  };

  onFilterSelect = (filterType, filters) => {
    this.state.filtersObj[filterType] = filters;
  };

  render() {
    const {isOpen, handleRequestClose, categories, regions, saveRow} = this.props;
    return (
      <Dialog open={isOpen} onRequestClose={handleRequestClose}>
        <DialogTitle>Filter tours to display</DialogTitle>
        <DialogContent className={css(styles.popup)}>
          {categories.length && regions.length &&
          <div>
            <FilteredTagSelector
              selectedItems={this.state.filtersObj.categories}
              onFilterSelect={this.onFilterSelect}
              filterType='categories'
              items={categories}
              label='Select categories'
            />
            <FilteredTagSelector
              selectedItems={this.state.filtersObj.regions}
              onFilterSelect={this.onFilterSelect}
              filterType='regions'
              items={regions}
              label='Select regions'
            />
          </div>
          }

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