import React, { Component } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import TinyMCE from 'react-tinymce';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import ItemsSelector from '../ui-elements/form/ItemsSelector';
import ImagePreview from '../ui-elements/ImagePreview';
import AddTourPreviewPopup from './AddTourPreviewPopup';

const styles = StyleSheet.create({
  field: {
    marginBottom: '10px;'
  },
  button: {
  }
});

class TourForm extends Component {
	constructor(props) {
		super(props);

    const { tour, regions } = this.props;
    const idsRegions = regions.map((item) => (item._id));
    const contentByLang = {...this.props.languagesIDs};

    Object.keys(contentByLang).forEach(key => {
      contentByLang[key] = {
        title: '',
        description: '',
        language: key
      }
    });

    this.props.tour.content.forEach(content => {
      contentByLang[content.language] = content
    });

		this.state = {
      contentByLang,
			anchorEl: undefined,
			open: false,
			preview: tour.preview,
      content: this.props.content,
      idsRegions: idsRegions,
      idsCategories: this.props.categoriesAllIds,
      checkedRegions: tour.regions || [],
      checkedCategories: tour.categories || []
		}
	}

  updateItems = (items, ids) => {
		this.setState({ [`checked${items}`]: ids })
  };

  handleInputChange = (langID, name) => event => {
    const contentByLang = {...this.state.contentByLang};
    contentByLang[langID][name] = event.target.value;
    this.setState({contentByLang});
  };

  handleEditorChange = (e, langID) => {
    const contentByLang = {...this.state.contentByLang};
    contentByLang[langID].content =e.target.getContent();
    this.setState({contentByLang});
  };

  addPreview = (id) => {
  	this.setState({ preview: id })
  };

	handleClickPreview = event => {
		this.setState({ open: true });
	};

	handleRequestClose = () => {
		this.setState({ open: false });
	};

  saveTour = (e) => {
    e.preventDefault();
    const tour = {...this.props.tour};
    tour.content = Object.values(this.state.contentByLang);
    tour.regions = [...this.state.checkedRegions];
    tour.categories = [...this.state.checkedCategories];
	  tour.preview = this.state.preview;
    this.props.onSubmit(tour, this.props.isNew);

    if (this.props.isNew) {
      this.props.history.push('/admin/tours', {});
    }
  };

	render() {
		const { languages, selectedTabIndex, isSaving, tour } = this.props;
		const { contentByLang } = this.state;

		return (
			<form onSubmit={(e) => this.saveTour(e)}>
        {languages.map((lang, i) => (
	        <div key={lang._id}>
            {selectedTabIndex === i &&
			        <div className="row">
				        <div className="col-sm-3" onClick={this.handleClickPreview}>
					        <ImagePreview url={tour.preview} />
				        </div>
				        <AddTourPreviewPopup />
				        <div className="col-md-6">
					        <TextField
						        name='title'
                    value={contentByLang[lang._id].title}
                    onChange={this.handleInputChange(lang._id, 'title')}
						        fullWidth
						        className={css(styles.field)}
						        label='Название'
					        />
					        <TextField
						        name='description'
                    value={contentByLang[lang._id].description}
                    onChange={this.handleInputChange(lang._id, 'description')}
						        fullWidth
						        className={css(styles.field)}
						        label='Мета описание'
					        />
					        <div className={css(styles.field)} >
						        <TinyMCE
                      content={contentByLang[lang._id].content}
                      config={{
                        plugins:'link image code',
                        height: '500'
                      }}
                      onChange={this.handleEditorChange}
                    />
					        </div>

									<ItemsSelector
										items={this.props.regionsByIDs}
										content={this.props.regionsContent}
										handleToggle={this.handleToggle}
										defaultChecked={this.state.checkedRegions}
                    updateItems={this.updateItems}
                    itemsName='Regions'
									/>

                  <ItemsSelector
                    items={this.props.categoriesByIDs}
                    content={this.props.regionsContent}
                    handleToggle={this.handleToggle}
                    defaultChecked={this.state.checkedCategories}
                    updateItems={this.updateItems}
                    itemsName='Categories'
                  />

                  <Button
                    raised
                    type="submit"
                    color="primary"
                    disabled={isSaving}
                  >
                    {isSaving ? 'Сохраняю...' : 'Сохранить'}
                  </Button>
				        </div>
			        </div>
            }
	        </div>
          )
        )}
			</form>
		)
	}
}

export default TourForm;
