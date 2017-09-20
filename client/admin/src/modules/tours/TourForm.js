import React, { Component } from 'react';
import { getContentByLang } from './toursReducer';
import Button from 'material-ui/Button';
import {StyleSheet, css} from 'aphrodite/no-important';
import ItemsSelector from '../ui-elements/form/ItemsSelector';
import TinyMCE from 'react-tinymce';
import TextField from 'material-ui/TextField';

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

		const { toursState, tour, regions, languagesState } = this.props;
    const idsRegions = regions.map((item) => (item._id));
    const initialValues = {};

    tour.content.forEach((contentId) => {
      languagesState.allIds.forEach((lang) => {
        const content = getContentByLang(toursState, contentId, lang);
        if (content) {
          initialValues[lang] = { ...content };
        }
      });
    });

		this.state = {
      initialValues,
			anchorEl: undefined,
			open: false,
			title: '',
			description: '',
			content: '',
      idsRegions: idsRegions,
      checked: tour.regions
		}
	}

  updateRegions = (ids) => {
		this.setState({ checked: ids })
  };

  handleInputChange = (e, langId) => {
    let state = {...this.state};

    state.initialValues[langId] ?
      state.initialValues[langId][e.target.name] = e.target.value
	    : state.initialValues[langId] = { language: langId, [e.target.name]: e.target.value };

    this.setState(state);
  };

  handleEditorChange = (e, langId) => {
    let state = {...this.state};
    state.initialValues[langId] ?
      state.initialValues[langId].content = e.target.getContent()
      : state.initialValues[langId] = { language: langId, content: e.target.getContent() };
  };

	submitForm = (e) => {
		e.preventDefault();
    const { checked, initialValues } = this.state;
		this.props.onSubmit(
      {
        regions: checked,
        content: Object.values(initialValues)
      }
		);
	};

	render() {
		const { languagesState, selectedTabIndex } = this.props;
		const { initialValues } = this.state;

		return (
			<form onSubmit={(e) => this.submitForm(e)}>
        {languagesState.allIds.map((langId, i) => (
	        <div key={langId}>
            {selectedTabIndex === i &&
			        <div className="row">
				        <div className="col-md-6">
					        <TextField
						        name='title'
						        defaultValue={initialValues[langId] ? initialValues[langId].title : ''}
						        onChange={(e) => this.handleInputChange(e, langId)}
						        fullWidth
						        className={css(styles.field)}
						        label='Название'
					        />
					        <TextField
						        name='description'
						        defaultValue={initialValues[langId] ? initialValues[langId].description : ''}
						        onChange={(e) => this.handleInputChange(e, langId)}
						        fullWidth
						        className={css(styles.field)}
						        label='Мета описание'
					        />
					        <div className={css(styles.field)} >
						        <TinyMCE
							        content={initialValues[langId] ? initialValues[langId].content : 'default content'}
											name='content'
							        config={{
                        plugins: 'link image code',
                        height: '500'
                      }}
							        onChange={(e) => this.handleEditorChange(e, langId)}
						        />
					        </div>

									<ItemsSelector
										items={this.props.regionsByIDs}
										content={this.props.regionsContent}
										handleToggle={this.handleToggle}
										defaultChecked={this.state.checked}
										updateRegions={this.updateRegions}
									/>

					        <Button type="submit" raised color="primary" className={css(styles.button)}>
						        Изменить
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
