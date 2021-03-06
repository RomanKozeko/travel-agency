import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import PageHeader from '../ui-elements/PageHeader';
import Portlet from '../ui-elements/Portlet';
import Spinner from '../ui-elements/Spinner';
import SortableTable from '../ui-elements/sortableTable/SortableTable';
import withSearch from '../ui-elements/HOC/withSearch';

const HotelsList = ({ items, languages, isFetching, deleteItems }) => {
  const data = {
    headers: ['Название', 'Звезды', 'Активен/Неактивен', 'Дата создания'],
    items,
    languages,
    fields: [
      {
        name: 'title',
        isLink: true,
        linkPrefix: '/admin/hotels/',
      },
      {
        name: 'stars',
        isLink: 'stars',
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
      <PageHeader text={'Все отели'} />
      <Button
        variant="raised"
        color="primary"
        style={{ marginBottom: '20px' }}
        className="addBottomMargin"
        component={Link}
        to="/admin/hotels/item?state=newItem"
      >
        Добавить новый отель
      </Button>
      {isFetching ? (
        <Spinner />
      ) : (
        <Portlet isBordered={false}>
          <SortableTable data={data} deleteItems={deleteItems} />
        </Portlet>
      )}
    </div>
  );
};

export default withSearch(HotelsList);
