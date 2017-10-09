import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
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
import { loadLang } from '../languages/LanguagesReducer';

const styles = StyleSheet.create({
  pageContainer: {
    minHeight: 'calc(100vh - 75px)',
    padding: '95px 20px 0'
  },
  sideBarWrapper: {
    width: '235px',
    float: 'left',
  },
  contentWrapper: {
    float: 'left',
    width: '100%'
  },
  content: {
    marginLeft: '235px',
    padding: '10px 0 0 20px'
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
    main: () => <h2>Hotels</h2>
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
    path: '/admin/settings',
    main: () => <h2>Settings</h2>
  }
];


const mapStateToProps = (state) => {
  return {
    items: state.languages.allIds,
    isFetching: state.languages.isFetching,
    isFetched: state.languages.isFetched
  };
};

class App extends React.Component {
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

App = connect(
  mapStateToProps,
  { loadLang }
)(App);


export default App;
