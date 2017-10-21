import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import AuthForm from './AuthForm';
import { loginUser } from './authActions';

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		'@media (min-width: 1000px)': {
			flexDirection: 'row',
		}
	},
	column: {
		width: '100%',
		minHeight: '50vh',
		'@media (min-width: 1000px)': {
			minHeight: '100vh',
		},
		backgroundColor: 'white'
	},
	logo: {
		backgroundImage: 'url(/web/build/logo.png)',
		backgroundSize: 'cover',
		color: '#1593d0',
		width: '50px',
		height: '36px',
		fontSize: '0',
	},
	content: {
		marginTop: '60px',
		'@media (min-width: 1000px)': {
			marginTop: '35%',
		}
	},
	header: {
		marginBottom: '30px',
		fontSize: '30px',
		fontWeight: 'normal',
	},
	description: {
		fontSize: '15px',
		lineHeight: '22px',
		color: '#a0a9b4'
	},
	padding: {
		padding: '40px'
	},
	bg: {
		backgroundImage: 'url(/web/build/forest2.jpg)',
		backgroundSize: 'cover',
	}
});

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
		const { from } = this.props.location.state || { from: { pathname: '/' } };
		const { isAuth, loginError } = this.props.auth;

		if (isAuth) {
			return (
				<Redirect to={from}/>
			)
		}

		return (
			<div className={css(styles.container)}>
				<div className={css(styles.column, styles.padding)}>
					<div className={css(styles.logo)}>Logo</div>
					<div className={css(styles.content)}>
						<h1 className={css(styles.header)}>Admin Login</h1>
						<p className={css(styles.description)}>Lorem ipsum dolor sit amet, coectetuer adipiscing elit sed diam
							nonummy et nibh euismod aliquam erat volutpat. Lorem ipsum dolor sit amet, coectetuer adipiscing.
						</p>
						<AuthForm loginError={loginError} onSubmit={this.submit.bind(this)}	/>
					</div>
				</div>
				<div className={css(styles.column, styles.bg)}>
				</div>
			</div>
		)
	}
}

Auth = connect(
	mapStateToProps,
	{ loginUser }
)(Auth);

export default Auth
