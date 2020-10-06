const loginTokenReducerDefaultState = null;

export const loginTokenReducer = (state = loginTokenReducerDefaultState, action) => {
  switch (action.type) {
    case "LOGIN_TOKEN":
      return action.result;

    default:
      return state;
  }
};

                 