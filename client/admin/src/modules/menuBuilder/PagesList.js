import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import uniqueId from 'lodash.uniqueid';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Portlet from '../ui-elements/Portlet';
import PageItem from './PageItem';

const styles = StyleSheet.create({
  ul: {
    listStyleType: 'none',
    padding: '0',
  },
});

const populateItems = items =>
  items.map(item => ({
    _id: uniqueId(),
    title: item.content[0].title,
    parent: null,
    page: item._id,
    children: [],
  }));

const PagesList = ({ items, saveItem, menuItems }) => {
  const populatedItems = populateItems(items).sort((a, b) => a.title > b.title);
  return (
    <Portlet isBordered={true}>
      {populatedItems.length ? (
        <ul className={css(styles.ul)}>
          {populatedItems.map(item => (
            <PageItem
              key={item._id}
              item={item}
              saveItem={saveItem}
              menuItems={menuItems}
            />
          ))}
        </ul>
      ) : (
        <div>
          <p>Все страницы использованы</p>
          <Button
            color="primary"
            className="addBottomMargin"
            component={Link}
            to="/admin/pages/page?state=newPage"
          >
            Создать новую страницу
          </Button>
        </div>
      )}
    </Portlet>
  );
};

export default PagesList;
