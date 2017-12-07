import React, {Component} from 'react';
import {connect} from 'react-redux';
import { loadItems, saveItem, deleteItems } from './showPlacesReducer';
import { getShowPlaces } from '../../rootReducer';
import ShowPlacesList from './ShowPlacesList';
import Spinner from '../ui-elements/Spinner';

const mapStateToProps = (state) => {
  return {
    items: getShowPlaces(state),
    isFetching: state.hotels.isFetching,
    isFetched: state.hotels.isFetched,
    isSaving: state.languages.isSaving,
    languages: state.languages
  };
};

class ShowPlacesContainer extends React.Component {
  componentDidMount() {
    if (!this.props.isFetched) {
      this.props.loadItems();
    }
  }

  render() {
    const { isFetching } = this.props;
    return (<div>
      {isFetching ?
        <Spinner/>
        :
        <ShowPlacesList
          {...this.props}
        />
      }
    </div>);
  }
}

ShowPlacesContainer = connect(
  mapStateToProps,
  { loadItems, saveItem, deleteItems }
)(ShowPlacesContainer);

export default ShowPlacesContainer;
