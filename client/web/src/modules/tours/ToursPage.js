import React, { Component } from 'react';
import ToursContainer from './ToursContainer';
import PageContent from '../ui-elements/PageContent';
import PageHeader from '../ui-elements/PageHeader';
import SearchFormContainer from './SearchFormContainer';

class ToursPage extends Component {
  render() {
    return (
      <>
        <PageHeader title="Поиск туров" />
        <PageContent>
          <SearchFormContainer />
          <ToursContainer />
        </PageContent>
      </>
    );
  }
}

export default ToursPage;
