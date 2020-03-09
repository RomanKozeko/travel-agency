import React, { useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import Head from '../ui-elements/Head';
import PageContent from '../ui-elements/PageContent';
import PageHeader from '../ui-elements/PageHeader';
import { getShowPlace } from '../../rootReducer';
import { loadShowPlace } from './showplacesActions';
import ImageSlider from '../ui-elements/ImageSlider';
import { PlaceIcon } from '../ui-elements/icons/Icons';
import { theme } from '../../services/constans';

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

const ShowPlace = ({
  item,
  isFetching,
  loadShowPlace,
  match: {
    params: { url },
  },
}) => {
  useEffect(() => {
    if (!item) {
      loadShowPlace(url);
    }
  }, [item, loadShowPlace, url]);

  return (
    <div>
      <Head
        title={item ? item.content.title : ''}
        metaDescription={item ? item.content.description : ''}
      />
      <PageHeader title={item ? item.content.title : ''} />
      <PageContent small loading={isFetching || !item}>
        {item && (
          <div className={css(styles.wrapper)}>
            {item.preview.length > 0 && (
              <div className={css(styles.slider)}>
                <ImageSlider images={item.preview} />
              </div>
            )}
            {item.content.address && (
              <div className={css(styles.addressWrap)}>
                <PlaceIcon color={theme.colors.primary} width={20} />{' '}
                <b>{item.content.address}</b>
              </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: item.content.content }} />
          </div>
        )}
      </PageContent>
    </div>
  );
};

const mapStateToProps = (state, router) => {
  return {
    item: getShowPlace(state, router.match.params.url),
    isFetching: state.showplaces.isFetching,
  };
};

export default connect(mapStateToProps, { loadShowPlace })(ShowPlace);
