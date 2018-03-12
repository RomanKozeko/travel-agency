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
import Button from '../ui-elements/Button';
import Map from '../ui-elements/Map';
import { getContentByLanguage } from '../../services/utils';
import { theme } from '../../services/constans';
import OrderForm from '../orderForm/OrderForm'

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
		borderTop: `5px solid ${theme.colors.primary}`,
		background: '#fff',
		boxShadow: theme.boxShadow,
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '5px'
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
    marginRight: '-7px',
    color: theme.colors.primary,
    borderTop: `5px solid ${theme.colors.primary}`,
    lineHeight: '40px',
    textAlign: 'center',
    background: '#fff',
    boxShadow: theme.boxShadow,
    borderRadius: '5px',
		'@media (min-width: 500px)': {
			minWidth: '100px',
		},
  },
	downloadLink: {
    textAlign: 'center',
    margin: '20px 0'
  },
  cell: {
    paddingRight: '20px'
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
              <div className="row">

                <div className="col-md-9">
                  <div className={css(styles.content)}>
                    <FancyHeader title='ИНФОРМАЦИЯ О ТУРЕ' />
                    <table>
                      <tr>
                        <td className={css(styles.cell)}>Маршрут:</td>
                        <td><b>{ tour.content.mapName }</b></td>
                      </tr>
	                    <tr>
		                    <td className={css(styles.cell)}>Дата проведения:</td>
		                    <td><b>{ tour.content.duration }</b></td>
	                    </tr>
	                    <tr>
		                    <td className={css(styles.cell)}>Время и место отправления:</td>
		                    <td><b>{ tour.content.departureInfo }</b></td>
	                    </tr>
	                    <tr>
		                    <td className={css(styles.cell)}>Количество дней:</td>
		                    <td><b>{ tour.days }</b></td>
	                    </tr>
	                    <tr>
		                    <td className={css(styles.cell)}>Тип питания:</td>
		                    <td><b>{ getContentByLanguage(tour.food.content, languageID).title }</b></td>
	                    </tr>
                    </table>
                  </div>
                  <div className={css(styles.content)}>
                    <FancyHeader title='Описание тура' />
                    <div dangerouslySetInnerHTML={{ __html:tour.content.content }} />
                  </div>

                  <div className={css(styles.content)}>
                    <FancyHeader title='МАРШРУТ' />
                    <Map places={tour.map} />
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
		                <FancyHeader title='Программа тура' />
		                {
			                tour.content.program.map(({ _id, description}, index) =>
				                <div key={ _id } className={css(styles.programWrapper)}>
					                <div className={css(styles.programDay)}>{ index + 1 }</div>
					                <div className={css(styles.programContent)} dangerouslySetInnerHTML={{ __html:description }} />
				                </div>
			                )
		                }
		                <div className={css(styles.downloadLink)}>
			                <Button>Скачать программму тура</Button>
                    </div>
	                </div>

                  <div className={css(styles.content)}>
                    <FancyHeader title='В стоимость тура входит' />
                    <div dangerouslySetInnerHTML={{ __html:tour.content.priceInclude }} />
                  </div>

                  <div className={css(styles.content)}>
                    <FancyHeader title='В стоимость тура не входит' />
                    <div dangerouslySetInnerHTML={{ __html:tour.content.priceNotInclude }} />
                  </div>

                </div>

	              <div className="col-md-3">
		              <OrderForm />
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
