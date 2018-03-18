import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import Spinner from '../ui-elements/Spinner';
import { getFeatured } from '../../rootReducer';
import { loadItems } from '../featured/FeaturedReducer';
import withEntities from "../ui-elements/HOC/withEntities";
import FeaturedList from "./FeaturedList";

class FeaturedContainer extends React.Component {
  render() {
    const { state: { featured : { isFetching }}} = this.props;
    return (
      <div>
        {isFetching ?
          <Spinner />
          :
          <FeaturedList
            {...this.props}
          />
        }
      </div>
    )
  }
}
const options = {
  featured: {
    loadItems,
    getItems: (state) => getFeatured(state)
  }
};

export default withEntities(FeaturedContainer, options);
