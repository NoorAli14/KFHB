const callReducerDefaultState = null;

export const receiveCallReducer = (state = callReducerDefaultState, action) => {
  switch (action.type) {

    case "RECEIVE_CALL":
      return action.res;
      
    default:
      return state;
  }
};
                 