import React from 'react'
import { connect } from 'react-redux';
import {StyleSheet, css} from 'aphrodite/no-important';
import { CircularProgress } from 'material-ui/Progress';
import PageHeader from '../ui-elements/PageHeader';
import Portlet from '../ui-elements/Portlet';
import TourTable from './TourTable';
import { loadTours } from './toursActions';
import { getPageWithTours } from '../../rootReducer';

const styles = StyleSheet.create({
	progress: {
		marginTop: '100px',
		textAlign: 'center'
	}
});

const mapStateToProps = (state) => {
  return {
    tours: getPageWithTours(state, state.tours.currPage),
    currPage: state.tours.currPage,
    pageCount: state.tours.pageCount,
    count: state.tours.count,
    isFetching: state.tours.isFetching
  }
};

class ToursContainer extends React.Component {
  submit(values) {


  }

  componentDidMount() {
    this.props.loadTours();
  }

  render() {
    const { tours, isFetching } = this.props;
    
    return (
      <div className="ToursContainer">
        {isFetching ?
          <div className={css(styles.progress)}>
            <CircularProgress size={50} />
          </div>
          :
          <div>
            <PageHeader text={'Все туры'} />
            <Portlet isBordered={false}>
              <TourTable cells={['title', 'description', 'language', 'content' ]} data={tours} />
            </Portlet>
          </div>

        }
      </div>
    )
  }
}

ToursContainer = connect(
  mapStateToProps,
  { loadTours }
)(ToursContainer);

export default ToursContainer
