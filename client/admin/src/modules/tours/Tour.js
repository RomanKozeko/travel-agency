import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {StyleSheet, css} from 'aphrodite/no-important';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import PageHeader from '../ui-elements/PageHeader';
import Portlet from '../ui-elements/Portlet';
import TourForm from './TourForm';
import { loadTour } from './toursActions';
import { getTour } from './toursReducer';

const styles = StyleSheet.create({
  field: {
    marginBottom: '10px;'
  },
  row: {
    height: '200px',
    width: '100%',
    border: '4px solid #aeaeae',
    margin: '20px 0',
    display: 'flex',
    padding: '0 5px;'
  },
  rowInner: {
    border: '4px dashed #e6e6e6',
    margin: '10px 5px;',
    display: 'flex',
    flexGrow: '1',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all .3s ease',
    ':hover': {
      border: '4px dashed #aeaeae',
    }
  },
	progress: {
		marginTop: '30px',
  	textAlign: 'center'
	}
});

const mapStateToProps = (state, router) => {
	return {
		tour: getTour(state.tours, router.match.params.id),
		isFetching: state.tours.isFetching
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
	}

	editTour() {

  }

  submit = (values) => {

  };

  render() {
    const { tour, isFetching}  = this.props;
    return (
      <div>
        <PageHeader text={'Тур:'}/>
        <Portlet isBordered={true}>
          {!tour || isFetching ?
	          <div className={css(styles.progress)}>
	            <CircularProgress size={50} />
	          </div>
            :
            <div>
		          <TourForm tour={tour} onSubmit={this.submit}/>
		          <Button raised color="primary" className={css(styles.button)} onClick={() => this.editTour()}>
			          Изменить
			        </Button>
            </div>
          }

        </Portlet>
      </div>
    )
  }
}


Tour = withRouter(connect(
	mapStateToProps,
  { loadTour }
)(Tour));

export default Tour;