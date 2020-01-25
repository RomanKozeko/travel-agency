import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PageHeader from '../ui-elements/PageHeader';
import Spinner from '../ui-elements/Spinner';
import BackLink from '../ui-elements/BackLink';
import { getLanguages, getShowplace, getRegions } from '../../rootReducer';
import { loadRegions } from '../regions/regionsReducer';
import {loadItem, saveItem} from './showplacesReducer';
import Portlet from '../ui-elements/Portlet';
import ShowPlaceForm from './ShowplaceForm';
import { populateTree } from '../regions/RegionService';

const uniqueId = require('lodash.uniqueid');

const createBlankPage = (languages) => {
  const content = [];
  languages.forEach((language) => {
    content.push({
      id: uniqueId(),
      title: '',
      description: '',
      rows: [],
      language: language._id,
    });
  });
  return {
    id: uniqueId(),
    preview: [],
    regions: [],
    enabled: true,
    content
  };
};

const mapStateToProps = (state, router) => {
  let item = getShowplace(state, router.match.params.id);
  const isNew = router.location.search.split('=')[1] === 'newItem';
  const languages = getLanguages(state);

  if (isNew) {
    item = createBlankPage(languages);
  }

  return {
    item,
    languages,
    isNew,
    languagesIDs: {...state.languages.byIds},
    regions: populateTree(getRegions(state)),
    isFetching: state.hotels.isFetching,
    regionsIsFetched: state.regions.regionsIsFetched,
    isSaving: state.hotels.isSaving
  };
};

class ShowPlaceContainer extends Component {
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
        <BackLink text="Назад к списку страниц" url="/admin/showplaces" />
        {isFetching || !item ? <Spinner /> :
          <div>
            <PageHeader text={item.content[0].title}/>
            <Portlet isBordered={isBordered}>
              <ShowPlaceForm {...this.props} />
            </Portlet>
          </div>
        }
      </div>
    );
  }
}
ShowPlaceContainer = withRouter(connect(
  mapStateToProps, {
    loadItem,
    save: saveItem,
    loadRegions
  }
)(ShowPlaceContainer));

export default ShowPlaceContainer;