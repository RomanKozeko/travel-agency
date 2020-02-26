import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/fn/array';
import 'core-js/fn/object';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import configureStore from './store/configureStore';
import PrivateRoute from './modules/auth/PrivateRoute';
import { getMeRequest } from './services/apiHelper';
import App from './modules/app/App';
import { Auth } from './modules/auth/Auth';
import * as serviceWorker from './serviceWorker';

import './index.css';

serviceWorker.unregister();

getMeRequest().then(res => {
  const preloadedState = {
    auth: {
      isAuth: !!res.userName,
    },
  };

  const store = configureStore(preloadedState);
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Router>
          <Switch>
            <Route path="/login" component={Auth} />
            <PrivateRoute path="/" component={App} />
          </Switch>
        </Router>
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="top-left"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
        />
      </div>
    </Provider>,
    document.getElementById('root')
  );
});
