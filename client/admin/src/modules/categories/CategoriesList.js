import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CircularProgress } from 'material-ui/Progress';
import {
  Link
} from 'react-router-dom';
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
        raised
        color="primary"
        className="addBottomMargin"
      >
        <Link to="/admin/categories/category?state=new" style={{color: '#fff'}}>Добавить категорию</Link>

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