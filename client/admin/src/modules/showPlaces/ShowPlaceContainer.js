import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import React from 'react';
import PageHeader from '../ui-elements/PageHeader';
import Spinner from '../ui-elements/Spinner';
import BackLink from '../ui-elements/BackLink';
import { getLanguages, getShowPlace, getRegions } from '../../rootReducer';
import { loadRegions } from '../regions/regionsReducer';
import {loadItem, saveItem} from './showPlacesReducer';
import Portlet from '../ui-elements/Portlet';
import ShowPlaceForm from './ShowPlaceForm';
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
    content
  };
};

const mapStateToProps = (state, router) => {
  let item = getShowPlace(state, router.match.params.id);
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

class ShowPlaceContainer extends React.Component {
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
        <BackLink text="Назад к списку страниц" url="/admin/show-places" />
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