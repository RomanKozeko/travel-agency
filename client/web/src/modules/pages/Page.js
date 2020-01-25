import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import { withRouter } from 'react-router-dom';
import { getPage } from '../../rootReducer';
import { loadPage, clearError } from './PagesActions';
import FilteredToursContainer from '../tours/FilteredToursContainer';
import PageContent from '../ui-elements/PageContent';
import PageHeader from '../ui-elements/PageHeader';
import FancyHeader from '../ui-elements/FancyHeader';
import ImageSlider from '../ui-elements/ImageSlider';
import Head from '../ui-elements/Head';
import ToursSearchFormContainer from '../tours/SearchFormContainer';
import ShowplacesSearchFormContainer from '../showplaces/SearchFormContainer';
import HotelsSearchFormContainer from '../hotels/SearchFormContainer';
import ContactForm from '../contactForm/ContactForm';
import NotFound from '../app/NotFound';

const mapStateToProps = (state, router) => ({
  page: getPage(state, router.match.params.id),
  isFetching: state.pages.isFetching,
  error: state.pages.error
});

const PageColumn = ({ item, page }) => {
  switch(item.type) {
    case 'content': {
      return <div dangerouslySetInnerHTML={{ __html: item.content }} />
    }
    case 'tours': {
      return <FilteredToursContainer query={item.filters} />
    }
    case '@hotelSearch': {
      return <HotelsSearchFormContainer />
    }
    case '@toursSearch': {
      return <ToursSearchFormContainer />
    }
    case '@showPlacesSearch': {
      return <ShowplacesSearchFormContainer />
    }
    case '@gallery': {
      return <ImageSlider images={ item.images.map(image => page.allImages.find(img => img._id === image)) } />
    }
    case '@contactForm': {
      return <ContactForm />
    }
    default:
      return <div dangerouslySetInnerHTML={{ __html: item.content }} />
  }
}

class Page extends React.Component {
  componentDidMount() {
    if (!this.props.page) {
      this.props.loadPage(this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.clearError()
  }

  getRowItemClass(size) {
    return 'col-sm-' + size.split('-')[2];
  }

  render() {
    const { isFetching, page, error } = this.props;
    return (
      <div>
        {
          error ?
            <NotFound /> :
            <div>
              <Head title={page ? page.content.title : ''} metaDescription={page ? page.content.description : ''} />
              <PageHeader title={page ? page.content.title : ''} />
              <PageContent>
                {isFetching || !page ?
                  <h4>Загрузка...</h4> :
                  page.content.rows.sort((a, b) => a.order - b.order).map(row => (
                    <div key={row._id} className="row">
                      { row.title && <FancyHeader title={ row.title } /> }
                      {row.items.map(item => (
                        <div key={item._id} className={this.getRowItemClass(item.size)}>
                          <PageColumn item={item} page={page} />
                        </div>
                      ))
                      }
                    </div>
                  ))
                }
              </PageContent>
            </div>
        }
      </div>
    );
  }
}

Page.propTypes = {
  page: PropTypes.object,
  loadPage: PropTypes.func,
  isFetching: PropTypes.bool,
  match: PropTypes.object,
};

Page = withRouter(connect(
  mapStateToProps,
  { loadPage, clearError }
)(Page));

export default Page