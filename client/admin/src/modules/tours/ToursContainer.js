import React from 'react'
import { connect } from 'react-redux';
import PageHeader from '../ui-elements/PageHeader';
import Portlet from '../ui-elements/Portlet';
import Spinner from '../ui-elements/Spinner';
import Pagination from '../ui-elements/Pagination'
import SortableTable from '../ui-elements/sortableTable/SortableTable';
import { loadTours } from './toursActions';
import { getPageWithTours } from '../../rootReducer';

const mapStateToProps = (state) => {
  return {
    items: getPageWithTours(state, state.tours.currPage),
    content: state.tours.toursContent,
    currPage: state.tours.currPage,
    pageCount: state.tours.pageCount,
    count: state.tours.count,
    languages: state.languages,
    isFetching: state.pages.isFetching
  }
};

class ToursContainer extends React.Component {
  submit(values) {


  }

  componentDidMount() {
    this.props.loadTours();
  }

  render() {
    const { items, content, languages, isFetching, currPage, count,
      loadTours, pageCount
    } = this.props;

    const data = {
      headers: ['Заголовок', 'Описание', 'Язык'],
      items,
      content,
      languages,
      fields: [
        {
          name: 'title',
          isLink: true,
          linkPrefix: 'tours/'
        },
        {
          name: 'description',
          isLink: false
        },
        {
          name: 'language',
          isLink: false
        }
      ]
    };

    return (
      <div className="ToursContainer">
        {isFetching ?
          <Spinner/>
          :
          <div>
            <PageHeader text={'Все туры'} />
            <Portlet isBordered={false}>
              <SortableTable data={data} />
            </Portlet>
            <Pagination
              pageNumber={currPage}
              pageCount={pageCount}
              requestPage={loadTours}
              totalPages={count}
            />
          </div>

        }
      </div>
    )
  }
}

ToursContainer = connect(
  mapStateToProps,
  { loadTours }
)(ToursContainer);

export default ToursContainer
