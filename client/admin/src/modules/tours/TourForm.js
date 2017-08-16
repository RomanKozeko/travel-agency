import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { getTour } from './toursReducer';
import { getRegion, getRegions } from '../regions/RegionsReducer';
import { Field, reduxForm } from 'redux-form';
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
		}
	}

	componentDidMount() {
		const { tour, regions } = this.props;
		const idsRegions = regions.map((item) => (item._id));
    let tourRegions;
		const idsChecked = idsRegions.filter((regionId) => {

      tourRegions = tour.regions.map((tourRegionId) => {
          return regionId === tourRegionId
        }
      );

      return tourRegions.forEach((item)=> item)

    });
		this.setState({
			idsRegions: idsRegions,
			checked: idsChecked
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

	submitForm = (data) => {
		this.props.handleSubmit(data);
	};

	render() {
		const { tour, regions } = this.props;
		const { idsRegions } = this.state;

		return (
			<form onSubmit={this.submitForm}>
				<div className="row">
					<div className="col-md-6">
						<Field name="title" component={RenderTextField} label="Название"/>
						<Field name="preview" component={RenderTextField} label="Preview"/>
						<Field name="__v" component={RenderTextField} label="Описание"/>
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
			</form>
		)
	}
}

TourForm = reduxForm({
  form: 'tourForm',
	config: { enableReinitialize: true }
})(TourForm);

TourForm = withRouter(connect(
  (state, router) => ({
	  tour: getTour(state.tours, router.match.params.id),
	  regions: getRegions(state.regions),
	  initialValues: getTour(state.tours, router.match.params.id),
	}),
	{ getRegion }
)(TourForm));

export default TourForm;