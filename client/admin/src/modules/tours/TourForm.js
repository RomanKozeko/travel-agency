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
		this.state = {
			anchorEl: undefined,
			open: false,
			idsRegions: [],
			checked: [],
			title: '',
			description: '',
			content: ''
		}
	}

  componentDidMount() {
    const {tour, regions} = this.props;
    const idsRegions = regions.map((item) => (item._id));
    let tourRegions = tour.regions;
    this.setState({
      idsRegions: idsRegions,
      checked: tourRegions
    })
  }

	handleToggle = (event, value) => {
		const { checked } = this.state;
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		this.setState({
			checked: newChecked,
		});
	};


	handleClickListItem = event => {
		this.setState({ open: true, anchorEl: event.currentTarget });
	};


	handleRequestClose = () => {
		this.setState({ open: false });
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
		const { languages, selectedTabIndex, initialValues, tourCont } = this.props;
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
					        <Field name={`${lang._id}.content`}
					               onChange={(e) => this.handleInputChange(e)}
					               component={RenderTextField}
					               label="Название"/>
					        <List>
						        <ListItem
							        button
							        aria-haspopup="true"
							        aria-controls="lock-menu"
							        aria-label="Регион"
							        onClick={this.handleClickListItem}
						        >
							        <ListItemText
								        primary="Регион"
								        secondary={this.state.checked.length > 0 ? this.state.checked.join(', ') : "Не выбрано"}
							        />
						        </ListItem>
					        </List>
					        <Menu
						        id="lock-menu"
						        anchorEl={this.state.anchorEl}
						        open={this.state.open}
						        onRequestClose={this.handleRequestClose}
					        >
                    {idsRegions.map((option, index) =>
							        <MenuItem
								        key={index}
								        onClick={event => this.handleToggle(event, option)}
							        >
								        <Checkbox
									        checked={this.state.checked.indexOf(option) !== -1}
									        tabIndex="-1"
									        disableRipple
								        />
                        {option}
							        </MenuItem>
                    )}
					        </Menu>

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
		  initialValues,
		  tourCont: initialValues
		}}
)(TourForm));

export default TourForm;