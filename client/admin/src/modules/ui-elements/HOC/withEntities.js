import React, { Component } from 'react';
import {connect} from 'react-redux';

function withEntities(WrappedComponent, options) {
  class BaseContainer extends Component {
    componentDidMount() {
      Object.keys(options).forEach(key => {
        if (!this.props.state[key].isFetched) {
          this.props.dispatch(options[key].loadItems());
        }
      })
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = (state) => {
    const obj = { state };
    Object.keys(options).forEach(key => {
      obj[key] = options[key].getItems(state);
    });
    return obj
  };

  return connect(
    mapStateToProps
  )(BaseContainer);
}

export default withEntities;
