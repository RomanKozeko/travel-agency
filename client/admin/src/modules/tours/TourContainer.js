import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {StyleSheet, css} from 'aphrodite/no-important';
import PageHeader from '../ui-elements/PageHeader';
import Portlet from '../ui-elements/Portlet';
import Spinner from '../ui-elements/Spinner';
import Tabs, { Tab, TabContainer } from 'material-ui/Tabs';
import TourForm from './TourForm';
import { loadTour, editTour } from './toursActions';
import { loadRegions } from '../regions/RegionsActions';
import { getTour, getTours } from './toursReducer';
import { getRegions } from '../regions/RegionsReducer';
import { getLanguages } from '../../rootReducer';

const styles = StyleSheet.create({
  tabs: {
    top: '-20px',
    zIndex: '1',
    position: 'relative',
    borderRadius: '4px 4px 0 0',
    borderBottom: '1px solid #dae2ea'
  }
});

const mapStateToProps = (state, router) => {
	return {
		tour: getTour(state.tours, router.match.params.id),
    toursState: state.tours,
    regionsByIDs: state.regions.byIds,
		regions: getRegions(state.regions),
    regionsContent: state.regions.regionsContent,
    languages: getLanguages(state),
    languagesState: state.languages,
		isFetching: state.tours.isFetching || state.regions.isFetching
	}
};

class TourContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tour: this.props.tour,
      index: 0
    }
  }

	componentDidMount() {
		if (!this.props.tour) {
		  this.props.loadTour(this.props.match.params.id);
		}
		if (this.props.regions.length < 1) {
			this.props.loadRegions();
		}
	}

  handleChange(event, index) {
    this.setState({ index });
  }

  submit = (data) => {
		this.props.editTour(this.props.tour._id, data);
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
	            <PageHeader text={`Тур: ${tour.content[0].title}`}/>
	            <Portlet isBordered={true}>
                <Tabs
                  className={css(styles.tabs)}
                  index={this.state.index}
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
  { loadTour, editTour, loadRegions }
)(TourContainer));

export default TourContainer;