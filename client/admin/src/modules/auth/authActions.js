import { toastr } from 'react-redux-toastr';
import createToaster from '../../modules/ui-elements/createToaster';
import { loginUserRequest } from '../../services/apiHelper';

export const requestLogin = () => ({
  type: 'REQUEST_LOGIN',
});

export const loginSuccess = tours => ({
  type: 'LOGIN_SUCCESS',
  tours,
});

export const loginFailure = () => ({
  type: 'LOGIN_FAILURE',
});

export const logoutSuccess = () => ({
  type: 'LOGOUT_SUCCESS',
});

export const loginUser = creds => dispatch => {
  dispatch(requestLogin());
  loginUserRequest(creds).then(res => {
    if (res.error) {
      toastr.error(
        '',
        '',
        createToaster(res.error.message || 'Wrong credentials')
      );
      dispatch(loginFailure());
    } else if (res.token) {
      localStorage.setItem('token', res.token);
      dispatch(loginSuccess());
    }
  });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('token');
  dispatch(logoutSuccess());
};
