import React from 'react'
import { Redirect } from 'react-router-dom'
import AuthContainer from './AuthContainer'

const fakeAuth = {
	isAuthenticated: false,
	authenticate(cb) {
		this.isAuthenticated = true
		setTimeout(cb, 100)
	},
	signout(cb) {
		this.isAuthenticated = false
		setTimeout(cb, 100)
	}
}

export class Auth extends React.Component {
	state = {
		redirectToReferrer: false
	}

	login = () => {
		fakeAuth.authenticate(() => {
			this.setState({ redirectToReferrer: true })
		})
	}

	render() {
		const { from } = this.props.location.state || { from: { pathname: '/' } }
		const { redirectToReferrer } = this.state

		if (redirectToReferrer) {
			return (
				<Redirect to={from}/>
			)
		}

		return (
			<div>
				<p>You must log in to view the page at {from.pathname}</p>
				<AuthContainer/>
			</div>
		)
	}
}
