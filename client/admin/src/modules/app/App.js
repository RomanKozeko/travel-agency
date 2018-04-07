import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {StyleSheet, css} from 'aphrodite/no-important';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import Header from '../header/AppHeader';
import SideBar from '../sideBar/SideBar';
import { LinearProgress } from 'material-ui/Progress';
import ToursContainer from '../tours/ToursContainer';
import TourContainer from '../tours/TourContainer';
import PagesContainer from '../pages/containers/PagesContainer';
import PageContainer from '../pages/containers/PageContainer';
import RegionsContainer from '../regions/RegionsContainer';
import RegionContainer from '../regions/RegionContainer';
import LanguagesContainer from '../languages/LanguagesContainer';
import CategoriesContainer from '../categories/CategoriesContainer';
import CategoryContainer from '../categories/CategoryContainer';
import MediaFilesContainer from '../mediaFiles/MediaFilesContainer';
import HotelsContainer from '../hotels/HotelsContainer';
import HotelContainer from '../hotels/HotelContainer';
import ShowPlacesContainer from '../showPlaces/ShowplacesContainer';
import ShowPlaceContainer from '../showPlaces/ShowplaceContainer';
import FoodContainer from '../food/FoodContainer';
import FoodItemContainer from '../food/FoodItemContainer';
import { loadLang } from '../languages/LanguagesReducer';
import MenuContainer from '../menuBuilder/MenuContainer';
import Home from "../home/Home";
import ContactsContainer from "../contacts/ContactsContainer";
const styles = StyleSheet.create({
  pageContainer: {
    minHeight: 'calc(100vh - 75px)',
    '@media (min-width: 800px)': {
      padding: '20px 20px 0'
    },
  },
  sideBarWrapper: {
    padding: '10px',
	  '@media (min-width: 1280px)': {
		  float: 'left',
		  width: '235px',
      padding: '0',
	  },
  },
  contentWrapper: {
    float: 'left',
    width: '100%'
  },
  content: {
	  '@media (min-width: 1280px)': {
		  marginLeft: '235px',
      padding: '10px 20px'
    },
    padding: '10px'
  }
});

const routes = [
  {
    path: '/admin/tours',
    exact: true,
    main: () => <ToursContainer />
  },
  {
    path: '/admin/tours/:id',
    exact: true,
    main: () => <TourContainer />
  },
  {
    path: '/admin/regions',
    exact: true,
    main: () => <RegionsContainer />
  },
  {
    path: '/admin/regions/:id',
    exact: true,
    main: () => <RegionContainer />
  },
  {
    path: '/admin/hotels',
    exact: true,
    main: () => <HotelsContainer />
  },
  {
    path: '/admin/hotels/:id',
    exact: true,
    main: () => <HotelContainer />
  },
  {
    path: '/admin/pages/:id',
    main: () => <PageContainer />
  },
  {
    path: '/admin/pages',
    exact: true,
    main: () => <PagesContainer />
  },
  {
    path: '/admin/lang',
    exact: true,
    main: () => <LanguagesContainer />
  },
  {
    path: '/admin/categories',
    exact: true,
    main: () => <CategoriesContainer />
  },
  {
    path: '/admin/categories/:id',
    exact: true,
    main: () => <CategoryContainer />
  },
  {
    path: '/admin/contacts',
    main: () => <ContactsContainer />
  },
  {
    path: '/admin/mediaFiles',
    main: () => <MediaFilesContainer />
  },
  {
    path: '/admin/showplaces',
    exact: true,
    main: () => <ShowPlacesContainer />
  },
  {
    path: '/admin/showplaces/:id',
    exact: true,
    main: () => <ShowPlaceContainer />
  },
  {
    path: '/admin/food',
    exact: true,
    main: () => <FoodContainer />
  },
  {
    path: '/admin/food/:id',
    exact: true,
    main: () => <FoodItemContainer />
  },
  {
    path: '/admin/menu',
    exact: true,
    main: () => <MenuContainer />
  },
  {
    path: '/admin',
    exact: true,
    main: () => <Home />
  },
  {
    path: '/admin/home',
    exact: true,
    main: () => <Home />
  },
];


const mapStateToProps = (state) => {
  return {
    items: state.languages.allIds,
    isFetching: state.languages.isFetching,
    isFetched: state.languages.isFetched
  };
};

export class App extends React.Component {
  componentDidMount() {
    if (!this.props.items.length) {
      this.props.loadLang();
    }
  }

  render() {
    const { isFetching, isFetched } = this.props;
    return (
      <div className="App">
        {isFetching || !isFetched
          ?
            <div> <LinearProgress /></div>
          :
            <div>
              <Header />
              <Router>
                <div className={css(styles.pageContainer, styles.clearfix)}>
                  <div className={css(styles.sideBarWrapper)}>
                    <SideBar />
                  </div>
                  <div className={css(styles.content)}>
                    {routes.map((route, index) => (
                      <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                      />
                    ))}
                  </div>
                </div>
              </Router>
            </div>
          }
      </div>
    );
  }
}
App.propTypes = {
  isFetching: PropTypes.bool,
  isFetched: PropTypes.bool,
  loadLang: PropTypes.func,
  items: PropTypes.array,
};

export default connect(
  mapStateToProps,
  { loadLang }
)(DragDropContext(HTML5Backend)(App));
