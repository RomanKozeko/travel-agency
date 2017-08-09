import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {StyleSheet, css} from 'aphrodite/no-important';
import PageHeader from '../ui-elements/PageHeader';
import Portlet from '../ui-elements/Portlet';
import Spinner from '../ui-elements/Spinner';
import TourForm from './TourForm';
import { loadTour, editTour } from './toursActions';
import { loadRegions } from '../regions/RegionsActions';
import { getTour } from './toursReducer';
import { getRegions } from '../regions/RegionsReducer';

const mapStateToProps = (state, router) => {
	return {
		tour: getTour(state.tours, router.match.params.id),
		regions: getRegions(state.regions),
		isFetching: state.tours.isFetching || state.regions.isFetching
	}
};


class Tour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

	componentDidMount() {
		if (!this.props.tour) {
		  this.props.loadTour(this.props.match.params.id);
		}
		if (!this.props.regions.length > 0) {
			this.props.loadRegions();
		}
	}

	editTour() {

  }

  submit = (data) => {
		this.props.editTour(this.props.tour._id, data);
  };

  render() {
    const { tour, isFetching, regions }  = this.props;
    return (
      <div>
          {!tour || isFetching ?
	          <Spinner/>
            :
            <div>
	            <PageHeader text={`Тур: ${tour.content[0].title}`}/>
	            <Portlet isBordered={true}>
		            <TourForm regions={regions} tour={tour} onSubmit={this.submit}/>
	            </Portlet>
            </div>
          }
      </div>
    )
  }
}


Tour = withRouter(connect(
	mapStateToProps,
  { loadTour, editTour, loadRegions }
)(Tour));

export default Tour;