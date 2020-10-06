const callReducerDefaultState = null;

export const callReducer = (state = callReducerDefaultState, action) => {

  switch (action.type) {    
    case "MUTE_CALL":
      return action.res;
      
    case "UNMUTE_CALL":
      return action.res;

    case "END_CALL":
      return action.res;
      
    default:
        return state;
  }
};
                 