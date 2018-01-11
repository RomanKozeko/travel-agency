import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import { withRouter } from 'react-router-dom';
import { getTour } from '../../rootReducer';
import { loadTour } from './toursActions';

const styles = StyleSheet.create({
  tour: {

  },
  tourContent: {
    padding: '40px 0'
  },
  header: {
    height: '287px',
    marginTop: '-76px',
    paddingTop: '76px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url(/web/build/v.jpg)',
    backgroundSize: 'cover',
  },
  headerTitle: {
    lineHeight: '27px',
    fontSize: '38px',
    fontWeight: 'bold',
    color: '#fefefe',
    textTransform: 'uppercase'
  }
});


const mapStateToProps = (state, router) => ({
  tour: getTour(state, router.match.params.id),
  isFetching: state.pages.isFetching
});

class Tour extends React.Component {
  componentDidMount() {
    if (!this.props.tour) {
      this.props.loadTour(this.props.match.params.id);
    }
  }

  render() {
    const { isFetching, tour } = this.props;
    return (
      <div>
        {isFetching || !tour ?
          <h1>Loading...</h1>
          :
          <div className={css(styles.tour)}>
            <header className={css(styles.header)}>
              <h1 className={css(styles.headerTitle)}>{tour.content.title}</h1>
            </header>
            <div className="container">
              <div className={css(styles.tourContent)}>
                {tour.title}
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

Tour.propTypes = {
  tour: PropTypes.object,
  loadTour: PropTypes.func,
  isFetching: PropTypes.bool,
  match: PropTypes.object,
};

Tour = withRouter(connect(
  mapStateToProps,
  { loadTour }
)(Tour));

export default Tour;
