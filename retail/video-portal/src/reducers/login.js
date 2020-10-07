const loginReducerDefaultState = null;

export const loginReducer = (state = loginReducerDefaultState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return action.user;
    
    case "USER_LOGOUT":
      return action.value;

    default:
      return state;
  }
};

                 