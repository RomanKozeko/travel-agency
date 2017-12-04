import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import PageHeader from '../ui-elements/PageHeader';
import Portlet from '../ui-elements/Portlet';
import Spinner from '../ui-elements/Spinner';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import SortableTable from '../ui-elements/sortableTable/SortableTable';
import ConfirmDialog  from '../ui-elements/form/ConfirmDialog'
import createConfirmation  from '../ui-elements/form/createConfirmation'
import { populateTree }  from './RegionService'

const styles = StyleSheet.create({
  actions: {
    width: '100px'
  },
  disabled: {
    backgroundColor: '#eee'
  },
  wrapper: {
    listStyle: 'none',
    marginBottom: '0'
  },
  li: {
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 1px 2px 1px rgba(0,0,0,0.1)',
    padding: '0 20px',
    background: '#fff',
    marginTop: '1px',
    minHeight: '48px'
  },
  treeWrapper: {
    marginLeft: '-40px',
    marginBottom: '20px'
  }
});

const confirm = createConfirmation(ConfirmDialog);

const deleteRow = (item, deleteItems) => event => {
  confirm({title: `Вы уверены что хотите удалить ${item.content[0].title}`, body: ''}).then((res) => {
    deleteItems([item._id])
  })
};

const TreeItems = ({items, deleteItems}) => (
  <div>
    {items.map(item => (
      <ul key={item._id} className={css(styles.wrapper)}>
        <li className={css(styles.li)}>
          <Link to={'/admin/regions/' + item._id}>{item.content[0].title}</Link>
          {!item.childrens &&
            <IconButton aria-label="Delete">
              <DeleteIcon onClick={deleteRow(item, deleteItems)}/>
            </IconButton>
          }
        </li>
        {item.childrens &&
        <TreeItems items={item.childrens} deleteItems={deleteItems} />
        }
      </ul>
    ))
    }
  </div>
);

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



  const tree = populateTree(items);

  return (
    <div>
      <PageHeader text={'Все регионы'} />
      <Button
        raised
        color="primary"
        className="addBottomMargin"
        component={Link}
        to="/admin/regions/region?state=new"
      >
        Добавить регион
      </Button>
        {isFetching
        ?
        <Spinner />
        :
        <Portlet isBordered={true}>
          <div className={css(styles.treeWrapper)}>
            <TreeItems items={tree} deleteItems={deleteRegions} />
          </div>
        </Portlet>
      }
    </div>
  );
};

export default RegionsList;
