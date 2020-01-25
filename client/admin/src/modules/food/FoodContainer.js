import React, {Component} from 'react';
import {connect} from 'react-redux';
import { loadItems, saveItem, deleteItems } from './foodReducer';
import { getFood } from '../../rootReducer';
import FoodList from './FoodList';
import Spinner from '../ui-elements/Spinner';

const mapStateToProps = (state) => {
  return {
    items: getFood(state),
    isFetching: state.food.isFetching,
    isFetched: state.food.isFetched,
    isSaving: state.languages.isSaving,
    languages: state.languages
  };
};

class FoodContainer extends React.Component {
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
        <FoodList
          {...this.props}
        />
      }
    </div>);
  }
}

FoodContainer = connect(
  mapStateToProps,
  { loadItems, saveItem, deleteItems }
)(FoodContainer);

export default FoodContainer;
