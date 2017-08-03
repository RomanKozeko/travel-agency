import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore'
import registerServiceWorker from './registerServiceWorker';
import PrivateRoute from './modules/auth/PrivateRoute';
import { getMeRequest } from './services/apiHelper';
import App from './modules/app/App';
import { Auth  } from './modules/auth/Auth';
import './index.css';

getMeRequest().then(res => {
	const preloadedState = {
		auth: {
			isAuth: !!res.userName
		}
	};

	const store = configureStore(preloadedState);
	ReactDOM.render(
		<Provider store={store}>
			<Router>
				<Switch>
					<Route path="/login" component={Auth}/>

					<PrivateRoute
						path="/"
						component={App}
					/>

				</Switch>
			</Router>
		</Provider>,
		document.getElementById('root'));
	registerServiceWorker();

});
