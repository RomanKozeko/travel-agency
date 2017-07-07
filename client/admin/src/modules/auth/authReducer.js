const authReducer = (state = { isAuth: false}, action) => {
  switch (action.type) {
    case 'REQUEST_LOGIN_SUCCESS': {
      return {
        ...state,
        isAuth: true
      }
    }
    default:
      return state
  }
};

export default authReducer;