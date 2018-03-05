import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import { withRouter } from 'react-router-dom';
import { getTour } from '../../rootReducer';
import { loadTour } from './toursActions';
import PageContent from '../ui-elements/PageContent';
import PageHeader from '../ui-elements/PageHeader';
import FancyHeader from '../ui-elements/FancyHeader';
import HotelPreview from '../ui-elements/HotelPreview';
import ItemsGallery from '../ui-elements/ItemsGallery';
import Map from '../ui-elements/Map';
import { getContentByLanguage } from '../../services/utils';

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
  },
  content: {
    paddingBottom: '30px'
  },
  hotelsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
	programContent: {
		border: '1px solid #1593d0',
    padding: '10px'
  },
	programWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
		marginTop: '-1px',
		'@media (min-width: 500px)': {
			flexDirection: 'row',
		},
  },
	programDay: {
    fontSize: '20px',
		minWidth: '100%',
    color: '#fff',
    lineHeight: '40px',
    textAlign: 'center',
    background: '#1593d0',
		'@media (min-width: 500px)': {
			minWidth: '100px',
		},
  }
});


const mapStateToProps = (state, router) => ({
  tour: getTour(state, router.match.params.id),
  isFetching: state.pages.isFetching,
  languageID: state.app.languages.urlPrefix
});

class Tour extends React.Component {
  componentDidMount() {
    if (!this.props.tour) {
      this.props.loadTour(this.props.match.params.id);
    }
  }

  render() {
    const { isFetching, tour, languageID } = this.props;
    return (
      <div>
        <div className={css(styles.tour)}>
          <PageHeader title={tour ? tour.content.title : ''} />
          <PageContent>
            {isFetching || !tour ?
              <h1>Loading...</h1>
              :
              <div>
                <FancyHeader title='ИНФОРМАЦИЯ О ТУРЕ' />
	              <div>Дата проведения: <b>{ tour.content.duration }</b></div>
	              <div>Время и место отправления:  <b>{ tour.content.departureInfo }</b></div>
	              <div>Количество дней:  <b>{ tour.days }</b></div>
	              <div>Тип питания:  <b>{ getContentByLanguage(tour.food.content, languageID).title }</b></div>

                <div className={css(styles.content)}>
	                <FancyHeader title='Описание тура' />
	                <div dangerouslySetInnerHTML={{ __html:tour.content.content }} />
                </div>

	              <div className={css(styles.content)}>
		              <FancyHeader title='МАРШРУТ' />
	                <Map places={tour.map} />
                </div>

	              <div className={css(styles.content)}>
		              <FancyHeader title='РАЗМЕЩЕНИЕ ПО ТУРУ' />
                  <ItemsGallery>
                    {
                      tour.hotels.map(hotel =>
                        <HotelPreview
                          key={ hotel._id }
                          item={ hotel }
                          url='hotels'
                          content={ getContentByLanguage(hotel.content, languageID) }
                        />
                      )
                    }
                  </ItemsGallery>
                </div>

	              <div className={css(styles.content)}>
		              <FancyHeader title='Достопримечательности' />
		              <ItemsGallery>
			              {
				              tour.showplaces.map(item =>
					              <HotelPreview
						              key={ item._id }
						              item={ item }
                          url='showplaces'
						              content={ getContentByLanguage(item.content, languageID) }
					              />
				              )
			              }
		              </ItemsGallery>
	              </div>

	              <div className={css(styles.content)}>
		              <FancyHeader title='В стоимость тура входит' />
		              <div dangerouslySetInnerHTML={{ __html:tour.content.priceInclude }} />
	              </div>

	              <div className={css(styles.content)}>
		              <FancyHeader title='В стоимость тура не входит' />
		              <div dangerouslySetInnerHTML={{ __html:tour.content.priceNotInclude }} />
	              </div>

	              <div className={css(styles.content)}>
                  <FancyHeader title='Программа тура' />
                  {
                    tour.content.program.map(({ _id, description}, index) =>
                     <div key={ _id } className={css(styles.programWrapper)}>
                       <div className={css(styles.programDay)}>{ index + 1 }</div>
                       <div className={css(styles.programContent)} dangerouslySetInnerHTML={{ __html:description }} />
                     </div>
                    )
                  }
                </div>

              </div>
            }
          </PageContent>
        </div>
      </div>
    );
  }
}

Tour = withRouter(connect(
  mapStateToProps,
  { loadTour }
)(Tour));

export default Tour;
