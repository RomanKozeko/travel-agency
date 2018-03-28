import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../../ui-elements/PageHeader';
import Spinner from '../../ui-elements/Spinner';
import BackLink from '../../ui-elements/BackLink';
import {getLanguages, getPage} from '../../../rootReducer';
import {loadItem, saveItem} from '../PagesReducer';
import {
  loadItems,
} from '../../mediaFiles/mediaFilesReducer';
import * as actions from '../pageReducer';
import Portlet from '../../ui-elements/Portlet';
import PageForm from '../components/PageForm';

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
  let page = getPage(state, router.match.params.id);
  const isNew = router.location.search.split('=')[1] === 'newPage';
  const languages = getLanguages(state);

  if (isNew) {
    page = createBlankPage(languages);
  }

  return {
    languagesIDs: state.languages.byIds,
    item: page,
    languages,
    isNew,
    page: state.page,
    isFetching: state.pages.isFetching,
    isSaving: state.pages.isSaving,
    mediafilesIsFetched: state.mediafiles.isFetched,
    mediafilesByIds: state.mediafiles.byIds,
  };
};

class PageContainer extends React.Component {
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
    if (!this.props.mediafilesIsFetched) {
      this.props.loadMediaFiles();
    }
  }

  render() {
    const { isFetching, item, isBordered = true, mediafilesIsFetched } = this.props;
    return (
      <div>
        <PageHeader text={'Cтраница:'} />
        <BackLink text="Назад к списку страниц" url="/admin/pages" />
        {isFetching || !item || !mediafilesIsFetched ? <Spinner /> :
          <Portlet isBordered={isBordered}><PageForm {...this.props} /></Portlet>
        }
      </div>
    );
  }
}

PageContainer.propTypes = {
  item: PropTypes.object,
  loadItem: PropTypes.func,
  isFetching: PropTypes.bool,
  match: PropTypes.object,
};

PageContainer = withRouter(connect(
  mapStateToProps, {
    loadItem,
    save: saveItem,
    pageAddRow: actions.pageAddRow,
    pageAddCustomRow: actions.pageAddCustomRow,
    pageDidMount: actions.pageDidMount,
    pageRemoveRow: actions.pageRemoveRow,
    pageUnmount: actions.pageUnmount,
    pageInputChange: actions.pageInputChange,
    openHtmlEditor: actions.openHtmlEditor,
    closeHtmlEditor: actions.closeHtmlEditor,
    openAddToursListPopup: actions.openAddToursListPopup,
    closeAddToursListPopup: actions.closeAddToursListPopup,
    saveRow: actions.saveRow,
    removeRowItem: actions.pageRemoveRowItem,
    editRowItem: actions.pageEditRowItem,
    editRowTitle: actions.editRowTitle,
    editOrder: actions.editOrder,
    openMediaPopup: actions.openMediaPopup,
    addImages: actions.addImages,
    closeMediaPopup: actions.closeMediaPopup,
    deleteMediaItem: actions.deleteMediaItem,
    loadMediaFiles: loadItems,
  }
)(PageContainer));

export default PageContainer;