import React from 'react'
import { connect } from 'react-redux';
import AuthForm from './AuthForm'
import { loginUser } from './authActions'
import { Redirect } from 'react-router-dom'

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
};

class Auth extends React.Component {
  submit(values) {
	  this.props.loginUser(values);
  }

  render() {
    const auth = this.props.auth.isAuth;
    return (
      <div>
      {auth ?
        <Redirect to={{pathname: '/' }} />
        :
        <AuthForm onSubmit={this.submit.bind(this)} />
      }
      </div>
    )
  }
}

let AuthContainer = connect(
  mapStateToProps,
  { loginUser }
)(Auth);

export default AuthContainer
