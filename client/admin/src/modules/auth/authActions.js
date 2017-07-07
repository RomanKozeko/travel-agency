import { loginUserRequest } from '../../services/apiHelper'

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

