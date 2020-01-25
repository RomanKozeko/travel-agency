import React, {Component} from 'react';
import { compose, lifecycle } from 'recompose'
import {connect} from 'react-redux';
import {StyleSheet, css} from 'aphrodite/no-important';
import Portlet from "../ui-elements/Portlet";
import { getSocialItems } from "../../rootReducer";
import { loadItems, saveItem, deleteItems } from "./SocialReducer";
import Spinner from '../ui-elements/Spinner';
import PageHeader from "../ui-elements/PageHeader";
import SocialForm from "./SocialForm";

class SocialContainer extends Component {
  render() {
    const { items } = this.props;
    return (
      <div>
        <PageHeader text={'Соц. сети'} />
        <Portlet isBordered >
          {
            this.props.isFetching || !this.props.isFetched ?
              <Spinner /> :
              <SocialForm items={ items } />
          }
        </Portlet>
      </div>

    )
  }
}

const mapStateToProps = state => {
  const items = getSocialItems(state)
  return {
    isFetched: state.social.isFetched,
    isFetching: state.social.isFetching,
    items
  }
};

export default compose(
  connect(mapStateToProps, { loadItems, saveItem, deleteItems }),
  lifecycle({
    componentDidMount() {
      if (!this.props.isFetched) {
        this.props.loadItems();
      }
    }
  })
)(SocialContainer);