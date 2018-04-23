import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PrefixLink from '../ui-elements/PrefixLink';
import PageContent from '../ui-elements/PageContent';
import PageHeader from '../ui-elements/PageHeader';
import { getHotel } from '../../rootReducer';
import { loadHotel } from './hotelsReducer';
import StarsList from '../ui-elements/StarsList';
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

const Hotel = ({ item, isFetching }) => (
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
          <StarsList starsCount={ item.stars } />
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
    item: getHotel(state, router.match.params.url),
    isFetching: state.hotels.isFetching,
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, { loadHotel }),
  lifecycle({
    componentDidMount() {
      if (!this.props.item) {
        this.props.loadHotel(this.props.match.params.url)
      }
    }
  })
)(Hotel)
