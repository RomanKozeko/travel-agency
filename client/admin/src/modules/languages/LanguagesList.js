import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CircularProgress } from 'material-ui/Progress';

import PageHeader from '../ui-elements/PageHeader';
import Portlet from '../ui-elements/Portlet';
import Spinner from '../ui-elements/Spinner';
import SortableTable from '../ui-elements/sortableTable/SortableTable';

const LanguagesList = ({ items, isFetching }) => {

  const data = {
    headers: ['Заголовок', 'Префикс'],
    pages: items,
    fields: [
      {
        name: 'title',
        isLink: true,
        linkPrefix: 'languages/'
      },
      {
        name: 'prefix',
        isLink: false
      }
    ]
  };

  return (
    <div>
      <PageHeader text={'Языки'} />
      {isFetching
        ?
        <Spinner />
        :
        <Portlet isBordered={false}>
          <SortableTable data={data} />
        </Portlet>
      }
    </div>
  );
}

LanguagesList.propTypes = {
  items: PropTypes.array,
  isFetching: PropTypes.bool,
};

export default LanguagesList;
