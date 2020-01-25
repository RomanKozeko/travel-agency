import React, { Component } from 'react';
import {connect} from 'react-redux';
import { loadRegions } from '../../regions/regionsReducer';
import { getRegions } from '../../../rootReducer';
import Skeleton from 'react-loading-skeleton';

function withRegions(WrappedComponent) {
  class BaseConatiner extends Component {
    componentDidMount() {
      if (!this.props.items.length) {
        this.props.loadRegions();
      }
    }

    render() {
      return (
        <div>
          {this.props.isFetching &&
            <div>
            <Skeleton/>
            <Skeleton count={5}/>
            <WrappedComponent/>
            </div>
          }
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      items: getRegions(state),
      content: state.regions.content,
      isFetching: state.regions.isFetching,
      languages: state.languages
    };
  };

  return connect(
    mapStateToProps,
    { loadRegions }
  )(BaseConatiner);

}



export default withRegions;