import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import PageHeader from '../ui-elements/PageHeader';
import Portlet from '../ui-elements/Portlet';
import Spinner from '../ui-elements/Spinner';
import SortableTable from '../ui-elements/sortableTable/SortableTable';

const CategoriesList = ({ items, languages, isFetching, deleteCategories }) => {
  const data = {
    headers: ['Заголовок', 'Описание', 'Дата создания'],
    items,
    languages,
    fields: [
      {
        name: 'title',
        isLink: true,
        linkPrefix: '/admin/categories/'
      },
      {
        name: 'description',
        isLink: false
      },
      {
        name: 'date',
        isLink: 'date'
      }
    ]
  };

  return (
    <div>
      <PageHeader text={'Все категории'} />
      <Button
        variant="raised"
        color="primary"
        style={{ marginBottom: '20px' }}
        component={Link}
        to="/admin/categories/category?state=new"
      >
        Добавить категорию
      </Button>
      {isFetching
        ?
        <Spinner />
        :
        <Portlet isBordered={false}>
          <SortableTable data={data} deleteItems={deleteCategories} />
        </Portlet>
      }
    </div>
  );
};

export default CategoriesList;