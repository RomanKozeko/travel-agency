import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import ImagePreview from '../../ui-elements/ImagePreview';
import PageCaption from '../../ui-elements/PageCaption';
import GridSelector from './GridSelector';
import Rows from './Rows';
import HtmlEditorPopup from './HtmlEditorPopup';
import withTabs from '../../ui-elements/HOC/withTabs';
import TextField from 'material-ui/TextField';
import AddToursListPopupContainer from '../containers/AddToursListPopupContainer';
import { denormalizeRowsItems } from '../pageFormService';
import MediaFilesPopup from '../../mediaFiles/MediaFilesPopup';

class PageForm extends Component {
  componentDidMount() {
    this.props.pageDidMount({
      htmlEditorOpen: false,
      addToursPopupOpen: false,
      contentByLang: { ...this.props.parentState.contentByLang },
      item: {
        ...this.props.item,
        content: this.props.languages.map(lang => {
          const itemContent = this.props.item.content.find(
            ic => ic.language === lang._id
          );
          const rows = itemContent ? itemContent.rows : [];
          return {
            ...itemContent,
            rows,
            language: lang._id,
          };
        }),
      },
      currRowItem: null,
    });
  }

  componentWillUnmount() {
    this.props.pageUnmount();
  }

  handleSave = e => {
    e.preventDefault();
    const { page, item } = this.props;

    //hotfix
    page.item.content.forEach(pic => {
      item.content.forEach(ic => {
        if (pic._id === ic._id) {
          pic.title = ic.title;
          pic.description = ic.description;
          pic.url = ic.url;
        }
      });
    });

    page.item.content = denormalizeRowsItems(
      page.item.content,
      page.rowItemsByID
    );
    page.item.url = page.item.url.replace(/\s+/g, '-').toLowerCase();

    this.props.save(page.item, this.props.isNew);
    if (this.props.isNew) {
      this.props.history.push('/admin/pages');
    }
  };

  render() {
    const {
      parentState,
      page,
      languages,
      isSaving,
      pageAddRow,
      pageRemoveRow,
      pageInputChange,
      openHtmlEditor,
      openAddToursListPopup,
      closeHtmlEditor,
      removeRowItem,
      saveRow,
      editRowItem,
      editRowTitle,
      editOrder,
      pageAddCustomRow,
      openMediaPopup,
      addImages,
      closeMediaPopup,
      mediafilesByIds,
      deleteMediaItem,
    } = this.props;
    if (!page.item) {
      return null;
    }
    return (
      <form onSubmit={this.handleSave}>
        {languages.map((lang, i) => (
          <div key={lang._id}>
            {parentState.selectedTabIndex === i && (
              <div>
                <div className="row">
                  <div className="col-sm-3">
                    <ImagePreview url={page.item.preview} />
                  </div>

                  <div className="col-sm-6">
                    <TextField
                      id="title"
                      label="title"
                      fullWidth
                      value={page.contentByLang[lang._id].title}
                      onChange={e =>
                        pageInputChange(lang._id, 'title', e.target.value)
                      }
                      margin="normal"
                      required
                    />
                    <TextField
                      id="url"
                      label="url"
                      fullWidth
                      value={page.item.url}
                      onChange={e =>
                        pageInputChange(null, 'url', e.target.value)
                      }
                      margin="normal"
                      required
                    />
                    <TextField
                      id="description"
                      label="Meta description"
                      fullWidth
                      value={page.contentByLang[lang._id].description}
                      onChange={e =>
                        pageInputChange(lang._id, 'description', e.target.value)
                      }
                      margin="normal"
                    />
                  </div>
                </div>

                <PageCaption text={'Добавить ряд'} />
                <GridSelector
                  pageAddRow={pageAddRow}
                  pageAddCustomRow={pageAddCustomRow}
                  count={4}
                  lang={lang._id}
                />

                <PageCaption text={'Схема страницы'} />
                <Rows
                  rows={page.contentByLang[lang._id].rows}
                  langId={lang._id}
                  rowsItems={page.rowItemsByID}
                  removeRow={pageRemoveRow}
                  removeRowItem={removeRowItem}
                  editRowItem={editRowItem}
                  openHtmlEditor={openHtmlEditor}
                  openAddToursListPopup={openAddToursListPopup}
                  editRowTitle={editRowTitle}
                  openMediaPopup={openMediaPopup}
                  editOrder={editOrder}
                  mediafilesByIds={mediafilesByIds}
                  deleteMediaItem={deleteMediaItem}
                  saveRow={saveRow}
                />
              </div>
            )}
          </div>
        ))}

        <HtmlEditorPopup
          isOpen={page.htmlEditorOpen}
          currentRowItem={page.currRowItem}
          saveRow={saveRow}
          handleRequestClose={closeHtmlEditor}
        />

        <MediaFilesPopup
          isOpen={page.mediaPopupIsOpen}
          handleRequestClose={closeMediaPopup}
          addPreview={addImages}
        />

        {page.addToursPopupOpen && <AddToursListPopupContainer />}

        <Button
          variant="raised"
          type="submit"
          color="primary"
          disabled={isSaving}
        >
          {isSaving ? 'Сохраняю...' : 'Сохранить'}
        </Button>
      </form>
    );
  }
}

PageForm.propTypes = {
  page: PropTypes.object,
  languages: PropTypes.array,
  handleSubmit: PropTypes.func,
  selectedTabIndex: PropTypes.number,
  isPageSaving: PropTypes.bool,
};

export default withTabs(PageForm, '/admin/pages');
