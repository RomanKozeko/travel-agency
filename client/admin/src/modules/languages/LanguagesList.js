import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import PageHeader from '../ui-elements/PageHeader';
import Portlet from '../ui-elements/Portlet';
import Spinner from '../ui-elements/Spinner';
import SortableTable from '../ui-elements/sortableTable/SortableTable';

const LanguagesList = ({ items, isFetching }) => {

  const data = {
    headers: ['Заголовок', 'Префикс'],
    items,
    fields: [
      {
        name: 'title',
        isLink: true,
        linkPrefix: 'lang/'
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
      <Button
        raised
        color="primary"
        className="addBottomMargin"
        onClick={() => this.props.savePage(this.state)}
      >
        Добавить язык
      </Button>
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
