import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageContent from '../ui-elements/PageContent';
import PageHeader from '../ui-elements/PageHeader';
import { getShowPlace } from '../../rootReducer';
import { loadShowPlace } from './showplacesReducer';
import ImageSlider from '../ui-elements/ImageSlider';
import { PlaceIcon } from '../ui-elements/icons/Icons';
import { theme } from '../../services/constans';

const styles = StyleSheet.create({
  slider: {
    marginBottom: '20px'
  },
  addressWrap: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    marginTop: '10px'
  }
});

const ShowPlace = ({ item, isFetching }) => (
  <div>
    <PageHeader title={item ? item.content.title : ''} />
    <PageContent small>
      {
        isFetching || !item ?
          <h5>Загрузка...</h5> :
          <div className={css(styles.wrapper)}>
            {
              item.preview.length &&
              <div className={css(styles.slider)}>
                <ImageSlider images={ item.preview } />
              </div>
            }
            <div className={css(styles.addressWrap)}>
              <PlaceIcon color={ theme.colors.primary } width={20}/> <b>{ item.content.address }</b>
            </div>

            <div dangerouslySetInnerHTML={{ __html: item.content.content }}/>
          </div>
      }
    </PageContent>
  </div>
);

const mapStateToProps = (state, router) => {
  return {
    item: getShowPlace(state, router.match.params.url),
    isFetching: state.hotels.isFetching,
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, { loadShowPlace }),
  lifecycle({
    componentDidMount() {
      if (!this.props.item) {
        this.props.loadShowPlace(this.props.match.params.url)
      }
    }
  })
)(ShowPlace)
