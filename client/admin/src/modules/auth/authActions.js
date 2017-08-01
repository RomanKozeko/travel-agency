import { loginUserRequest } from '../../services/apiHelper';

export const requestLogin = () => ({
  type: 'REQUEST_LOGIN'
});

export const loginSuccess = (tours) => ({
  type: 'REQUEST_LOGIN_SUCCESS',
  tours
});

export const loginFailure = () => ({
  type: 'REQUEST_LOGIN_FAILURE'
});

export const logoutSuccess = () => ({
	type: 'LOGOUT_SUCCESS'
});

export const loginUser = (creds) => (dispatch) => {
	loginUserRequest(creds)
		.then(dispatch(requestLogin()))
		.then((res) => {
			if(res.error) {
				dispatch(loginFailure());
			} else if (res.token) {
				localStorage.setItem('token', res.token);
				dispatch(loginSuccess());
			}
		})
		.catch((err) => {
			dispatch(loginFailure());
		})
};

export const logoutUser = () => (dispatch) => {
	localStorage.removeItem('token');
	dispatch(logoutSuccess());
};
