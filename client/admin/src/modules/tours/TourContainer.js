import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {StyleSheet, css} from 'aphrodite/no-important';
import PageHeader from '../ui-elements/PageHeader';
import Portlet from '../ui-elements/Portlet';
import Spinner from '../ui-elements/Spinner';
import BackLink from '../ui-elements/BackLink';
import Tabs, { Tab, TabContainer } from 'material-ui/Tabs';
import TourForm from './TourForm';
import { loadTour, addTour, editTour } from './toursActions';
import { loadRegions } from '../regions/regionsReducer';
import { loadCategories } from '../categories/categoriesReducer';
import * as fromFoodReducer from '../food/foodReducer';
import * as fromHotelsReducer from '../hotels/hotelsReducer';
import { getTour } from './toursReducer';
import { loadItems } from '../mediaFiles/mediaFilesReducer';
import { getLanguages, getHotels, getCategories, getFood, getRegions } from '../../rootReducer';
import { populateTree } from '../regions/RegionService';

const styles = StyleSheet.create({
  tabs: {
    top: '-20px',
    zIndex: '1',
    position: 'relative',
    borderRadius: '4px 4px 0 0',
    borderBottom: '1px solid #dae2ea'
  }
});

const uniqueId = require('lodash.uniqueid');

const createBlankPage = (languages) => {
  const content = [];
  languages.forEach((language) => {
    content.push({
      id: uniqueId(),
      title: '',
      description: '',
      mapName: '',
      duration: '',
      program: [],
      language: language._id
    });
  });
  return {
    id: uniqueId(),
    enabled: true,
    preview: [],
    hotels: [],
    showPlaces: [],
    regions: [],
    map: [],
    categories: [],
    content
  };
};


const mapStateToProps = (state, router) => {
  let tour = getTour(state.tours, router.match.params.id);
  const isNew = router.location.search.split('=')[1] === 'new';
  const languages = getLanguages(state);

  if (isNew) {
    tour = createBlankPage(languages);
  }
	return {
		tour,
    isNew,
    regionsByIDs: state.regions.byIds,
    regions: populateTree(getRegions(state)),
    regionsContent: state.regions.regionsContent,
    categories: getCategories(state),
    hotelsByIDs: state.hotels.byIds,
    categoriesByIDs: state.categories.byIds,
    categoriesAllIds: state.categories.allIds,
    languagesIDs: state.languages.byIds,
    food: getFood(state),
    languages,
    selectedPreview: state.mediafiles.selected,
    mediaFiles: state.mediafiles,
		isFetching: state.tours.isFetching || state.regions.isFetching || state.hotels.isFetching,
		isSaving: state.tours.isSaving,
	}
};

class TourContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    }
  }

	componentDidMount() {
		if (!this.props.tour) {
		  this.props.loadTour(this.props.match.params.id);
		}
		if (!this.props.regions.length ) {
			this.props.loadRegions();
		}
    if (!this.props.categories.length) {
      this.props.loadCategories();
    }

    if (!this.props.food.length) {
      this.props.loadFoodItems();
    }
	}

  handleChange(event, index) {
    this.setState({ index });
  }

  submit = (tour, isNew) => {
    isNew ?
		this.props.addTour(tour):
    this.props.editTour(tour);
  };

  render() {
    const { tour, isFetching }  = this.props;
    const tabIndex  = this.state.index;
    return (
      <div>
          {!tour || isFetching ?
	          <Spinner/>
            :
            <div>
              <BackLink text="Назад к списку туров" url="/admin/tours"/>
              <PageHeader text={'Тур:'}/>
	            <Portlet isBordered={true}>
                <Tabs
                  className={css(styles.tabs)}
                  value={this.state.index}
                  onChange={(event, index) => this.handleChange(event, index)}
                >
                  {this.props.languages.map(lang => (<Tab label={lang.title} key={lang._id}/>))}
                </Tabs>

		            <TourForm
                  {...this.props}
                  onSubmit={this.submit}
                  selectedTabIndex={tabIndex}/>
	            </Portlet>
            </div>
          }
      </div>
    )
  }
}


TourContainer = withRouter(connect(
	mapStateToProps,
  {
    loadTour,
    addTour,
    editTour,
    loadRegions,
    loadCategories,
    loadItems,
    loadFoodItems: fromFoodReducer.loadItems,
  }
)(TourContainer));

export default TourContainer;