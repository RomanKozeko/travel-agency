import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import PageHeader from '../../ui-elements/PageHeader';
import Portlet from '../../ui-elements/Portlet';
import Spinner from '../../ui-elements/Spinner';
import SortableTable from '../../ui-elements/sortableTable/SortableTable';
import withSearch from '../../ui-elements/HOC/withSearch';

const PagesList = ({ items, languages, isFetching, deleteItems }) => {
  const data = {
    headers: ['Заголовок', 'Активен/Неактивен', 'Дата создания'],
    items,
    languages,
    fields: [
      {
        name: 'title',
        isLink: true,
        linkPrefix: '/admin/pages/',
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
      <PageHeader text={'Все страницы'} />
      <Button
        variant="raised"
        color="primary"
        style={{ marginBottom: '20px' }}
        component={Link}
        to="/admin/pages/page?state=newPage"
      >
        Добавить страницу
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

export default withSearch(PagesList);
