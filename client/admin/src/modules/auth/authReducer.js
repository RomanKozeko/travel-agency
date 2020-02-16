const authReducer = (state = { isAuth: false }, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        isAuth: true,
      };
    }
    case 'LOGOUT_SUCCESS': {
      return {
        ...state,
        isAuth: false,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
