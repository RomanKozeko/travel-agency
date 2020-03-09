import React, { useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import Head from '../ui-elements/Head';
import PageContent from '../ui-elements/PageContent';
import PageHeader from '../ui-elements/PageHeader';
import { getHotel } from '../../rootReducer';
import { loadHotel } from './hotelsActions';
import StarsList from '../ui-elements/StarsList';
import ImageSlider from '../ui-elements/ImageSlider';
import { PlaceIcon } from '../ui-elements/icons/Icons';
import { theme } from '../../services/constans';
import OrderForm from '../orderForm/OrderForm';

const styles = StyleSheet.create({
  slider: {
    marginBottom: '20px',
  },
  addressWrap: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    marginTop: '10px',
  },
});

const Hotel = ({
  item,
  isFetching,
  loadHotel,
  match: {
    params: { url },
  },
}) => {
  useEffect(() => {
    if (!item) {
      loadHotel(url);
    }
  }, [item, loadHotel, url]);
  return (
    <>
      <Head
        title={item ? item.content.title : ''}
        metaDescription={item ? item.content.description : ''}
      />
      <PageHeader title={item ? item.content.title : ''} />
      <PageContent small loading={isFetching || !item}>
        {item && (
          <div className="row">
            <div className="col-md-9">
              <div className={css(styles.wrapper)}>
                {item.preview.length > 0 && (
                  <div className={css(styles.slider)}>
                    <ImageSlider images={item.preview} />
                  </div>
                )}
                <StarsList starsCount={item.stars} />
                <div className={css(styles.addressWrap)}>
                  <PlaceIcon color={theme.colors.primary} width={20} />{' '}
                  <b>{item.content.address}</b>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: item.content.content }}
                />
              </div>
            </div>
            <div className="col-md-3">
              <OrderForm item={item} itemName={'hotel'} />
            </div>
          </div>
        )}
      </PageContent>
    </>
  );
};

const mapStateToProps = (state, router) => {
  return {
    item: getHotel(state, router.match.params.url),
    isFetching: state.hotels.isFetching,
  };
};

export default connect(mapStateToProps, { loadHotel })(Hotel);
