import React from 'react';
import Button from 'material-ui/Button';
import {css, StyleSheet} from 'aphrodite/no-important';
import Dialog, {
  DialogActions,
  DialogTitle,
  DialogContent
} from 'material-ui/Dialog';
import FilteredTagSelector from '../../ui-elements/FilteredTagSelector';

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
    const filtersObj = { ...this.props.currRowItem.filtersObj }
    if (filtersObj.categories && filtersObj.categories[0] && !filtersObj.categories[0]._id) {
      filtersObj.categories = this.props.categories.filter(category => filtersObj.categories.includes(category._id))
    }

    if (filtersObj.regions && filtersObj.regions[0] && !filtersObj.regions[0]._id) {
      filtersObj.regions = this.props.regions.filter(category => filtersObj.regions.includes(category._id))
    }

    this.state = {
      filtersObj: filtersObj || {}
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
        <DialogTitle>Выбрать фильтры</DialogTitle>
        <DialogContent className={css(styles.popup)}>
          {categories.length && regions.length &&
          <div>
            <FilteredTagSelector
              selectedItems={this.state.filtersObj.categories}
              onFilterSelect={this.onFilterSelect}
              filterType='categories'
              items={categories}
              label='Выбрать категории'
            />
            <FilteredTagSelector
              selectedItems={this.state.filtersObj.regions}
              onFilterSelect={this.onFilterSelect}
              filterType='regions'
              items={regions}
              label='Выбрать регионы'
            />
          </div>
          }

        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="secondary">
            Отмена
          </Button>
          <Button onClick={() => saveRow('', 'tours', this.state)} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default AddToursListPopup;