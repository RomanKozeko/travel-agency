import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeAddToursListPopup } from '../pageReducer';
import { loadCategories } from '../../categories/categoriesReducer';
import { loadRegions } from '../../regions/regionsReducer';
import { getCategories, getRegions } from '../../../rootReducer';
import { saveRow } from '../pageReducer';
import AddToursListPopup from '../components/AddToursListPopup';

const mapStateToProps = state => ({
  isOpen: state.page.addToursPopupOpen,
  currRowItem: state.page.currRowItem,
  categories: getCategories(state),
  regions: getRegions(state),
  isFetched: state.regions.isFetched && state.categories.isFetched,
});

class AddToursListPopupContainer extends Component {
  componentDidMount() {
    if (!this.props.categories.length) {
      this.props.loadCategories();
    }
    if (!this.props.regions.length) {
      this.props.loadRegions();
    }
  }

  render() {
    return this.props.isFetched ? <AddToursListPopup {...this.props} /> : null;
  }
}

AddToursListPopupContainer = connect(
  mapStateToProps,
  {
    handleRequestClose: closeAddToursListPopup,
    loadCategories,
    loadRegions,
    saveRow,
  }
)(AddToursListPopupContainer);

export default AddToursListPopupContainer;
