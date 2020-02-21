import React, { Component } from 'react';
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
import Head from '../ui-elements/Head';
import Map from '../ui-elements/Map';
import { getContentByLanguage } from '../../services/utils';
import { theme } from '../../services/constans';
import OrderForm from '../orderForm/OrderForm';

const styles = StyleSheet.create({
  tour: {},
  tourContent: {
    padding: '40px 0',
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
    textTransform: 'uppercase',
  },
  content: {
    paddingBottom: '30px',
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
    borderRadius: '5px',
    width: '100%',
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
    margin: '20px 0',
  },
  cell: {
    paddingRight: '20px',
  },
  btn: {
    display: 'inline-block',
    color: '#fff',
    textTransform: 'uppercase',
    lineHeight: '40px',
    minWidth: '150px',
    padding: '5px 20px',
    boxSizing: 'border-box',
    transition: 'all .3s ease',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: theme.colors.primary,
    outline: 'none',
    width: '100%',
    '@media (min-width: 500px)': {
      width: 'auto',
    },
    ':hover': {
      color: '#fff',
      textDecoration: 'none',
      backgroundColor: theme.colors.primaryAccent,
    },
  },
  price: {
    fontSize: '23px',
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state, router) => ({
  tour: getTour(state, router.match.params.id),
  isFetching: state.pages.isFetching,
  languageID: state.app.languages.urlPrefix,
  currency: state.app.languages.currency,
  currencies: state.app.languages.currencies,
});

const getPrice = ({
  price,
  priceBYN,
  priceRUB,
  priceEUR,
  pricePLN,
  priceUSD,
  currency,
  currencies,
}) => {
  if (!currency) {
    return `${priceBYN || price || '0'} BYN`;
  }

  const Cur_ID = currency.split(',')[2];

  if (Cur_ID === 'BYN') {
    return `${priceBYN || price || '0'} BYN`;
  }

  if (!priceBYN && !priceRUB && !priceEUR && !pricePLN && !priceUSD) {
    const currencyWithRate = currencies.find(
      item => item.Cur_ID === Number(Cur_ID)
    );

    return `${(
      ((price || 0) / currencyWithRate.Cur_OfficialRate) *
      currencyWithRate.Cur_Scale
    ).toFixed(0) || '0'} ${currencyWithRate.Cur_Abbreviation}`;
  }

  const { Cur_Abbreviation } = currencies.find(
    item => item.Cur_ID === Number(Cur_ID)
  );

  switch (Cur_Abbreviation) {
    case 'BYN':
      return `${priceBYN} BYN`;
    case 'RUB':
      return `${priceRUB} RUB`;
    case 'EUR':
      return `${priceEUR} EUR`;
    case 'USD':
      return `${priceUSD} USD`;
    case 'PLN':
      return `${pricePLN} PLN`;
    default:
      return `${priceBYN || price} BYN`;
  }
};

class Tour extends Component {
  componentDidMount() {
    if (!this.props.tour) {
      this.props.loadTour(this.props.match.params.id);
    }
  }

  render() {
    const { isFetching, tour, languageID, currency, currencies } = this.props;
    const { price, priceBYN, priceRUB, priceEUR, pricePLN, priceUSD } = tour
      ? tour.content
      : {};
    return (
      <div>
        <Head
          title={tour ? tour.content.title : ''}
          metaDescription={tour ? tour.content.description : ''}
        />
        <div className={css(styles.tour)}>
          <PageHeader title={tour ? tour.content.title : ''} />
          <PageContent>
            {isFetching || !tour ? (
              <h1>Загрузка...</h1>
            ) : (
              <div className="row">
                <div className="col-md-9">
                  <div className={css(styles.content)}>
                    <FancyHeader title={window.TA.content.tourInfo} />
                    <table>
                      <tr>
                        <td className={css(styles.cell)}>
                          {window.TA.content.route}:
                        </td>
                        <td>
                          <b>{tour.content.mapName}</b>
                        </td>
                      </tr>
                      <tr>
                        <td className={css(styles.cell)}>
                          {window.TA.content.date}:
                        </td>
                        <td>
                          <b>{tour.content.duration}</b>
                        </td>
                      </tr>
                      <tr>
                        <td className={css(styles.cell)}>
                          {window.TA.content.departureInfo}:
                        </td>
                        <td>
                          <b>{tour.content.departureInfo}</b>
                        </td>
                      </tr>
                      <tr>
                        <td className={css(styles.cell)}>
                          {window.TA.content.daysAmount}:
                        </td>
                        <td>
                          <b>{tour.days}</b>
                        </td>
                      </tr>
                      <tr>
                        <td className={css(styles.cell)}>
                          {window.TA.content.foodType}:
                        </td>
                        <td>
                          <b>
                            {tour.food &&
                              getContentByLanguage(
                                tour.food.content,
                                languageID
                              ).title}
                          </b>
                        </td>
                      </tr>
                      <tr>
                        <td className={css(styles.cell)}>
                          {window.TA.content.price}:
                        </td>
                        <td>
                          <div className={css(styles.price)}>
                            {getPrice({
                              price,
                              priceBYN,
                              priceRUB,
                              priceEUR,
                              pricePLN,
                              priceUSD,
                              currency,
                              currencies,
                            })}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div className={css(styles.content)}>
                    <FancyHeader title={window.TA.content.tourDescription} />
                    <div
                      dangerouslySetInnerHTML={{ __html: tour.content.content }}
                    />
                  </div>

                  {tour.content.programs &&
                    tour.content.programs.map((item, index) => (
                      <div className={css(styles.content)}>
                        <FancyHeader
                          title={`${window.TA.content.tourProgram} ${index +
                            1}`}
                        />
                        {item.program.map(({ _id, description }, index) => (
                          <div key={_id} className={css(styles.programWrapper)}>
                            <div className={css(styles.programDay)}>
                              {window.TA.content.day} {index + 1}
                            </div>
                            <div
                              className={css(styles.programContent)}
                              dangerouslySetInnerHTML={{ __html: description }}
                            />
                          </div>
                        ))}
                        {tour.content.programFile[0] && (
                          <div className={css(styles.downloadLink)}>
                            <a
                              href={tour.content.programFile[0].path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={css(styles.btn)}
                            >
                              {window.TA.content.downloadTourProgram}
                            </a>
                          </div>
                        )}
                      </div>
                    ))}

                  {!tour.content.programs && (
                    <div className={css(styles.content)}>
                      <FancyHeader title={window.TA.content.tourProgram} />
                      {tour.content.program.map(
                        ({ _id, description }, index) => (
                          <div key={_id} className={css(styles.programWrapper)}>
                            <div className={css(styles.programDay)}>
                              {window.TA.content.day} {index + 1}
                            </div>
                            <div
                              className={css(styles.programContent)}
                              dangerouslySetInnerHTML={{ __html: description }}
                            />
                          </div>
                        )
                      )}
                      {tour.content.programFile[0] && (
                        <div className={css(styles.downloadLink)}>
                          <a
                            href={tour.content.programFile[0].path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={css(styles.btn)}
                          >
                            {window.TA.content.downloadTourProgram}
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  <div className={css(styles.content)}>
                    <FancyHeader title={window.TA.content.showPlaces} />
                    <ItemsGallery>
                      {tour.showplaces.map(item => (
                        <HotelPreview
                          key={item._id}
                          item={item}
                          url="showplaces"
                          content={getContentByLanguage(
                            item.content,
                            languageID
                          )}
                        />
                      ))}
                    </ItemsGallery>
                  </div>

                  <div className={css(styles.content)}>
                    <FancyHeader title={window.TA.content.accommodation} />
                    <ItemsGallery>
                      {tour.hotels.map(hotel => (
                        <HotelPreview
                          key={hotel._id}
                          item={hotel}
                          url="hotels"
                          content={getContentByLanguage(
                            hotel.content,
                            languageID
                          )}
                        />
                      ))}
                    </ItemsGallery>
                  </div>

                  <div className={css(styles.content)}>
                    <FancyHeader title={window.TA.content.includedInPrice} />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: tour.content.priceInclude,
                      }}
                    />
                  </div>

                  <div className={css(styles.content)}>
                    <FancyHeader title={window.TA.content.notIncludedInPrice} />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: tour.content.priceNotInclude,
                      }}
                    />
                  </div>

                  <div className={css(styles.content)}>
                    <FancyHeader title={window.TA.content.route} />
                    <Map places={tour.map} />
                  </div>
                </div>

                <div className="col-md-3">
                  <OrderForm item={tour} itemName={'tour'} />
                </div>
              </div>
            )}
          </PageContent>
        </div>
      </div>
    );
  }
}

Tour = withRouter(
  connect(
    mapStateToProps,
    { loadTour }
  )(Tour)
);

export default Tour;
