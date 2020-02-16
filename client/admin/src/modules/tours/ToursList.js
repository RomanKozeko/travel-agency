import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import PageHeader from '../ui-elements/PageHeader';
import Portlet from '../ui-elements/Portlet';
import Spinner from '../ui-elements/Spinner';
import SortableTable from '../ui-elements/sortableTable/SortableTable';
import Pagination from '../ui-elements/Pagination';
import withSearch from '../ui-elements/HOC/withSearch';

class ToursList extends Component {
  render() {
    const {
      items,
      languages,
      deleteTours,
      currPage,
      pageCount,
      loadTours,
      isFetching,
    } = this.props;

    const data = {
      items,
      languages,
      headers: ['Заголовок', 'Активный/Неактивный', 'Дата создания'],
      fields: [
        {
          name: 'title',
          isLink: true,
          linkPrefix: 'tours/',
        },
        {
          name: 'enabled',
          isLink: 'toggle',
        },
        {
          name: 'date',
          isLink: 'date',
        },
      ],
    };

    return (
      <div>
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
        {isFetching ? (
          <Spinner />
        ) : (
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
        )}
      </div>
    );
  }
}

export default withSearch(ToursList);
