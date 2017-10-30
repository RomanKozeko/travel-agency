import React from 'react'
import { connect } from 'react-redux'
import { closeAddToursListPopup } from '../pageReducer'
import { loadCategories } from '../../categories/categoriesReducer'
import { loadRegions } from '../../regions/regionsReducer'
import { getCategories, getRegions } from '../../../rootReducer';
import { saveRow } from '../pageReducer';
import AddToursListPopup from '../components/AddToursListPopup'

const mapStateToProps = state => ({
  isOpen: state.page.addToursPopupOpen,
  categories: getCategories(state),
  regions: getRegions(state)
});


class AddToursListPopupContainer extends React.Component {
  componentDidMount() {
    if (!this.props.categories.length) {
      this.props.loadCategories();
    }
    if (!this.props.regions.length) {
      this.props.loadRegions();
    }
  }

  render() {
    return (<AddToursListPopup {...this.props} />);
  }
}


AddToursListPopupContainer = connect(
  mapStateToProps,
  {
    handleRequestClose: closeAddToursListPopup,
    loadCategories,
    loadRegions,
    saveRow
  }
)(AddToursListPopupContainer);

export default AddToursListPopupContainer