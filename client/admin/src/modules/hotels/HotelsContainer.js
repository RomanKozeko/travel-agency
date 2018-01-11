import React, {Component} from 'react';
import {connect} from 'react-redux';
import { loadItems, saveItem, deleteItems } from './hotelsReducer';
import { getHotels } from '../../rootReducer';
import HotelsList from './HotelsList';
import Spinner from '../ui-elements/Spinner';

const mapStateToProps = (state) => {
  return {
    items: getHotels(state),
    isFetching: state.hotels.isFetching,
    isFetched: state.hotels.isFetched,
    isSaving: state.languages.isSaving,
    languages: state.languages
  };
};

class HotelsContainer extends React.Component {
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
        <HotelsList
          {...this.props}
        />
      }
    </div>);
  }
}

HotelsContainer = connect(
  mapStateToProps,
  { loadItems, saveItem, deleteItems }
)(HotelsContainer);

export default HotelsContainer;
