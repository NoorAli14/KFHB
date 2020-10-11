const callReducerDefaultState = null;

export const receiverReducer = (state = callReducerDefaultState, action) => {
  switch (action.type) {    
    case "ATTEND_CALL":
        return action.res;
      
    case "DECLINE_CALL":
        return action.res;
      
    default:
        return state;
  }
};
                 