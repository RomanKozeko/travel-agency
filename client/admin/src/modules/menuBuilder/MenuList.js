import React from 'react';
import { populateTree }  from './menuService';
import Portlet from '../ui-elements/Portlet';
import TreeItems from './TreeItems';

const MenuList = (props) => {
  const tmp = JSON.parse(JSON.stringify( props.menuItems ));
  const tree = populateTree([...tmp]);

  return (
    <Portlet isBordered={true}>
      {tree.length ?
        <TreeItems {...props} tree={tree} />
        :
        <p>Добавьте первую страницу</p>
      }

    </Portlet>
  );
};

export default MenuList;
