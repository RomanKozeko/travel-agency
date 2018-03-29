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
      headers: ['Заголовок', 'Активный/Неактивный', 'Дата создания'],
      fields: [
        {
          name: 'title',
          isLink: true,
          linkPrefix: 'tours/'
        },
        {
          name: 'enabled',
          isLink: 'toggle',
        },
        {
          name: 'date',
          isLink: 'date'
        }
      ]
    };

    return (
      <div className="ToursContainer">
        <PageHeader text={'Все туры'} />
        <Button
          variant="raised"
          color="primary"
          style={{ marginBottom: '20px' }}
          component={Link}
          to="/admin/tours/tour?state=new"
        >
          Добавить тур
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
