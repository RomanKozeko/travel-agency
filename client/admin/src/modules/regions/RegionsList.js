import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import PageHeader from '../ui-elements/PageHeader';
import Portlet from '../ui-elements/Portlet';
import Spinner from '../ui-elements/Spinner';
import SortableTable from '../ui-elements/sortableTable/SortableTable';

const RegionsList = ({ items, languages, isFetching, deleteRegions }) => {
  const data = {
    headers: ['Заголовок', 'Описание', 'Дата создания'],
    items,
    languages,
    fields: [
      {
        name: 'title',
        isLink: true,
        linkPrefix: '/admin/regions/'
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
      <PageHeader text={'Все регионы'} />
      <Button
        raised
        color="primary"
        className="addBottomMargin"
      >
        <Link to="/admin/regions/region?state=new" style={{ color: '#fff' }}>Добавить регион</Link>

      </Button>
      {isFetching
        ?
        <Spinner />
        :
        <Portlet isBordered={false}>
          <SortableTable data={data} deleteItems={deleteRegions} />
        </Portlet>
      }
    </div>
  );
};

export default RegionsList;
