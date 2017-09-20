import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { getTour, getContentByLang } from './toursReducer';
import { getRegion, getRegions } from '../regions/RegionsReducer';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import Button from 'material-ui/Button';
import RenderTextField from '../ui-elements/form/RenderTextField';
import {StyleSheet, css} from 'aphrodite/no-important';
import Menu, { MenuItem } from 'material-ui/Menu';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
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

    const {tour, regions} = this.props;
    const idsRegions = regions.map((item) => (item._id));

		this.state = {
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

  handleInputChange = (e) => {
    let state = {...this.state};

    state[e.target.name] = e.target.value;
    this.setState(state);
  };

	submitForm = (e) => {
		e.preventDefault();
    let { checked } = this.state;
		this.props.onSubmit(
      {
        regions: checked
      }
		);
	};

	render() {
		const { languages, regions, selectedTabIndex } = this.props;
		const { idsRegions } = this.state;

		return (
			<form onSubmit={(e) => this.submitForm(e)}>
        {languages.map((lang, i) => (
	        <div key={lang._id}>
            {selectedTabIndex === i &&
			        <div className="row">
				        <div className="col-md-6">
					        <Field name={`${lang._id}.title`}
					               onChange={(e) => this.handleInputChange(e)}
					               component={RenderTextField}
					               label="Название"/>
					        <Field name={`${lang._id}.description`}
					               onChange={(e) => this.handleInputChange(e)}
					               component={RenderTextField}
					               label="Описание"/>
					        <TinyMCE
						        content='default content'
						        config={{
                      plugins: 'link image code',
                      height: '500'
                    }}
						        onChange={(e) => this.handleInputChange(e)}
					        />
					        <Field name={`${lang._id}.content`}
					               onChange={(e) => this.handleInputChange(e)}
					               component={RenderTextField}
					               label="Название"/>
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

TourForm = reduxForm({
  form: 'tourForm',
	config: { enableReinitialize: true }
})(TourForm);

const selector = formValueSelector('tourForm');

TourForm = withRouter(connect(
  (state, router) => {
    const { languages } = state;
  	const tourId = router.match.params.id;
    const tour = getTour(state.tours, tourId);
    const initialValues = {};

    const tourCopy = { ...tour };

    tourCopy.content.forEach((contentId) => {
      languages.allIds.forEach((lang) => {
        const content = getContentByLang(state, contentId, lang);
        if (content) {

          initialValues[lang] = { ...content };
        }
      });
    });

  	return {
		  initialValues
		}}
)(TourForm));

export default TourForm;