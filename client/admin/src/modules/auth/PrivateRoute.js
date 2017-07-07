import React  from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => {
	return {
		isAuth: state.auth.isAuth,
		props
	}
};

let PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
	return (
		<Route {...rest} render={props => (
			isAuth ? (
				<Component {...props}/>
			) : (
				<Redirect to={{
					pathname: '/login',
					state: { from: props.location }
				}}/>
			)
		)}/>
	)
};

PrivateRoute = connect(
	mapStateToProps
)(PrivateRoute);

export default PrivateRoute;