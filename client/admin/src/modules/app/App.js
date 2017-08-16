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
import Tour from '../tours/Tour';
import PagesContainer from '../pages/PagesContainer';
import PageContainer from '../pages/PageContainer';
import RegionsContainer from '../regions/RegionsContainer';
import LanguagesContainer from '../languages/LanguagesContainer';
import { loadLanguages } from '../languages/LanguagesActions';

const styles = StyleSheet.create({
  pageContainer: {
    minHeight: '100vh',
    marginTop: '75px',
    padding: '20px 20px 0'
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
    path: '/tours',
    exact: true,
    main: () => <ToursContainer />
  },
  {
    path: '/tours/:id',
    exact: true,
    main: () => <Tour />
  },
  {
    path: '/regions',
    main: () => <RegionsContainer />
  },
  {
    path: '/hotels',
    exact: true,
    main: () => <h2>Hotels</h2>
  },
  {
    path: '/pages/:id',
    main: () => <PageContainer />
  },
  {
    path: '/pages',
    exact: true,
    main: () => <PagesContainer />
  },
  {
    path: '/lang',
    exact: true,
    main: () => <LanguagesContainer />
  },
  {
    path: '/settings',
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
      this.props.loadLanguages();
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
  loadLanguages: PropTypes.func,
  items: PropTypes.array,
};

App = connect(
  mapStateToProps,
  { loadLanguages }
)(App);


export default App;
