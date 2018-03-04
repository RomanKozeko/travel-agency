import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import { withRouter } from 'react-router-dom';
import { getTour } from '../../rootReducer';
import { loadTour } from './toursActions';
import PageContent from '../ui-elements/PageContent';
import PageHeader from '../ui-elements/PageHeader';
import FancyHeader from '../ui-elements/FancyHeader';
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
	img: {
		width: '210px',
		height: '210px',
		backgroundColor: '#333',
		backgroundSize: 'cover',
	},
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
	              <div>Дата проведения: { tour.content.duration }</div>
	              <div>Время и место отправления: { tour.content.departureInfo }</div>
	              <div>Количество дней: { tour.days }</div>
	              <div>Тип питания: { getContentByLanguage(tour.food.content, languageID).title }</div>

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
                  {tour.hotels.map(hotel => {
                      let content =  getContentByLanguage(hotel.content, languageID)
                      return <div>
                          <h3>{ content.title }</h3>
	                      <div className={css(styles.img)} style={{
	                        backgroundImage: `url(${hotel.preview[0] && hotel.preview[0].path ? hotel.preview[0].path : '/web/build/v.jpg'}`
	                      }} />
	                        <div dangerouslySetInnerHTML={{ __html: content.content }} />
                      </div>
                    })
                  }
                </div>

                <FancyHeader title='Достопримечательности' />

	              <div className={css(styles.content)}>
		              <FancyHeader title='В стоимость тура входит' />
		              <div dangerouslySetInnerHTML={{ __html:tour.content.priceInclude }} />
	              </div>

	              <div className={css(styles.content)}>
		              <FancyHeader title='В стоимость тура не входит' />
		              <div dangerouslySetInnerHTML={{ __html:tour.content.priceNotInclude }} />
	              </div>

                <FancyHeader title='Программа тура' />
                <div className="container">
                  <div className={css(styles.tourContent)}>
                    {tour.title}
                  </div>
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
