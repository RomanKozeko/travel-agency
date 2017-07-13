import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import AuthForm from './AuthForm'
import { loginUser } from './authActions'

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
};

export class Auth extends React.Component {
	submit(values) {
		this.props.loginUser(values);
	}

	render() {
		const { from } = this.props.location.state || { from: { pathname: '/' } }
		const { isAuth } = this.props.auth;

		if (isAuth) {
			return (
				<Redirect to={from}/>
			)
		}

		return (
			<div>
				<p>You must log in to view the page at {from.pathname}</p>
					<AuthForm onSubmit={this.submit.bind(this)} />
			</div>
		)
	}
}

Auth = connect(
	mapStateToProps,
	{ loginUser }
)(Auth);

export default Auth
