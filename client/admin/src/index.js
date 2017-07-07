import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './modules/app/App';
import { Auth  } from './modules/auth/Auth';
import PrivateRoute from './modules/auth/PrivateRoute';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';
import { getMeRequest } from './services/apiHelper';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Product = () => <h3>Product</h3>
const Book = () => <h3>Book</h3>

getMeRequest().then(res => {
	const preloadedState = {
		auth: {
			isAuth: !!res.userName
		}
	};

	const store = createStore(rootReducer, preloadedState, composeEnhancers(
		applyMiddleware(thunkMiddleware)
	));

	ReactDOM.render(
		<Provider store={store}>
			<Router>
				<Switch>
					<Route path="/login" component={Auth}/>

					<PrivateRoute
						path="/tours"
						component={App}
					/>

				</Switch>
			</Router>
		</Provider>,
		document.getElementById('root'));
	registerServiceWorker();

});
