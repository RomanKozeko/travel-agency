import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import PageHeader from '../ui-elements/PageHeader';
import Portlet from '../ui-elements/Portlet';
import Spinner from '../ui-elements/Spinner';
import SortableTable from '../ui-elements/sortableTable/SortableTable';


const FoodList = ({ items, languages, isFetching, deleteItems }) => {
  const data = {
    headers: ['Название', 'Активен/Неактивен', 'Дата создания'],
    items,
    languages,
    fields: [
      {
        name: 'title',
        isLink: true,
        linkPrefix: '/admin/food/'
      },
      {
        name: 'enabled',
        isLink: 'toggle'
      },
      {
        name: 'date',
        isLink: 'date'
      }
    ]
  };

  return (
    <div>
      <PageHeader text={'Все виды питания'} />
      <Button
        variant="raised"
        color="primary"
        style={{ marginBottom: '20px' }}
        className="addBottomMargin"
        component={Link}
        to="/admin/food/item?state=newItem"
      >
        Добавить новый тип питания
      </Button>
      {isFetching
        ?
        <Spinner />
        :
        <Portlet isBordered={false}>
          <SortableTable data={data} deleteItems={deleteItems} />
        </Portlet>
      }
    </div>
  );
};

export default FoodList;
