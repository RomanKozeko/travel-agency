import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import React from 'react';
import PageHeader from '../ui-elements/PageHeader';
import Spinner from '../ui-elements/Spinner';
import BackLink from '../ui-elements/BackLink';
import {getLanguages, getHotel} from '../../rootReducer';
import {loadItem, saveItem} from './HotelsReducer';
import Portlet from '../ui-elements/Portlet';
import HotelForm from './HotelForm';

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
    preview: '',
    content
  };
};

const mapStateToProps = (state, router) => {
  let item = getHotel(state, router.match.params.id);
  const isNew = router.location.search.split('=')[1] === 'newItem';
  const languages = getLanguages(state);

  if (isNew) {
    item = createBlankPage(languages);
  }

  return {
    languagesIDs: {...state.languages.byIds},
    item,
    languages,
    isNew,
    isFetching: state.hotels.isFetching,
    isSaving: state.hotels.isSaving
  };
};

class HotelContainer extends React.Component {
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
  }

  render() {
    const { isFetching, item, isBordered = true } = this.props;
    return (
      <div>
        <BackLink text="Назад к списку страниц" url="/admin/hotels" />
        {isFetching || !item ? <Spinner /> :
          <div>
            <PageHeader text={item.content[0].title}/>
            <Portlet isBordered={isBordered}>
              <HotelForm {...this.props} />
            </Portlet>
          </div>
        }
      </div>
    );
  }
}

HotelContainer = withRouter(connect(
  mapStateToProps, {
    loadItem
  }
)(HotelContainer));

export default HotelContainer;