import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageHeader from '../ui-elements/PageHeader';
import Spinner from '../ui-elements/Spinner';
import BackLink from '../ui-elements/BackLink';
import { getLanguages, getFoodItem } from '../../rootReducer';
import { loadRegions } from '../regions/regionsReducer';
import { loadItem, saveItem } from './foodReducer';
import Portlet from '../ui-elements/Portlet';
import FoodItemForm from './FoodItemForm';

const uniqueId = require('lodash.uniqueid');

const createBlankPage = languages => {
  const content = [];
  languages.forEach(language => {
    content.push({
      id: uniqueId(),
      title: '',
      description: '',
      language: language._id,
    });
  });
  return {
    id: uniqueId(),
    preview: '',
    enabled: true,
    content,
  };
};

const mapStateToProps = (state, router) => {
  let item = getFoodItem(state, router.match.params.id);
  const isNew = router.location.search.split('=')[1] === 'newItem';
  const languages = getLanguages(state);

  if (isNew) {
    item = createBlankPage(languages);
  }

  return {
    item,
    languages,
    isNew,
    languagesIDs: state.languages.byIds,
    content: state.food.content,
    isFetching: state.food.isFetching,
    isSaving: state.food.isSaving,
  };
};

class FoodItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    if (!this.props.item) {
      this.props.loadItem(this.props.match.params.id);
    }
    if (!this.props.regionsIsFetched) {
      this.props.loadRegions();
    }
  }

  render() {
    const { isFetching, item, isBordered = true } = this.props;
    return (
      <div>
        <BackLink text="Назад к списку страниц" url="/admin/food" />
        {isFetching || !item ? (
          <Spinner />
        ) : (
          <div>
            <PageHeader text={item.content[0].title} />
            <Portlet isBordered={isBordered}>
              <FoodItemForm {...this.props} />
            </Portlet>
          </div>
        )}
      </div>
    );
  }
}
FoodItemContainer = withRouter(
  connect(
    mapStateToProps,
    {
      loadItem,
      save: saveItem,
      loadRegions,
    }
  )(FoodItemContainer)
);

export default FoodItemContainer;
