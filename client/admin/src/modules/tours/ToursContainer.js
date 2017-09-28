import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import PageHeader from '../ui-elements/PageHeader';
import Portlet from '../ui-elements/Portlet';
import Spinner from '../ui-elements/Spinner';
import Pagination from '../ui-elements/Pagination';
import SortableTable from '../ui-elements/sortableTable/SortableTable';
import { loadTours, deleteTours } from './toursActions';
import { getPageWithTours } from '../../rootReducer';

const mapStateToProps = (state) => {
  return {
    items: getPageWithTours(state, state.tours.currPage),
    currPage: state.tours.currPage,
    pageCount: state.tours.pageCount,
    count: state.tours.count,
    languages: state.languages,
    isFetching: state.pages.isFetching
  };
};

class ToursContainer extends React.Component {

  componentDidMount() {
    this.props.loadTours();
  }

  render() {
    const { items, languages, isFetching, currPage, count, pageCount,
      loadTours, deleteTours
    } = this.props;

    const data = {
      items,
      languages,
      headers: ['Заголовок', 'Описание', 'Язык'],
      fields: [
        {
          name: 'title',
          isLink: true,
          linkPrefix: 'tours/'
        },
        {
          name: 'description',
          isLink: false
        },
        {
          name: 'language',
          isLink: false
        }
      ]
    };

    return (
      <div className="ToursContainer">
        <PageHeader text={'Все туры'} />
        <Button
          raised
          color="primary"
          className="addBottomMargin"
        >
          <Link to="/admin/tours/tour?state=new" style={{color: '#fff'}}>Добавить тур</Link>

        </Button>
        {isFetching ?
          <Spinner />
          :
          <div>
            <Portlet isBordered={false}>
              <SortableTable data={data} deleteItems={deleteTours} />
            </Portlet>
            <Pagination
              pageNumber={currPage}
              pageCount={pageCount}
              requestPage={loadTours}
            />
          </div>
        }
      </div>
    );
  }
}

ToursContainer = connect(
  mapStateToProps,
  { loadTours, deleteTours }
)(ToursContainer);

export default ToursContainer;
