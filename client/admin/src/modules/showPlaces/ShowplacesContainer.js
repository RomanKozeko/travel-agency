import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadItems, saveItem, deleteItems } from './showplacesReducer';
import { getShowplaces } from '../../rootReducer';
import ShowPlacesList from './ShowplacesList';
import Spinner from '../ui-elements/Spinner';

const mapStateToProps = state => {
  return {
    items: getShowplaces(state),
    isFetching: state.showplaces.isFetching,
    isFetched: state.showplaces.isFetched,
    isSaving: state.languages.isSaving,
    languages: state.languages,
  };
};

class ShowPlacesContainer extends Component {
  componentDidMount() {
    if (!this.props.isFetched) {
      this.props.loadItems();
    }
  }

  render() {
    const { isFetching } = this.props;
    return (
      <div>{isFetching ? <Spinner /> : <ShowPlacesList {...this.props} />}</div>
    );
  }
}

ShowPlacesContainer = connect(
  mapStateToProps,
  { loadItems, saveItem, deleteItems }
)(ShowPlacesContainer);

export default ShowPlacesContainer;
