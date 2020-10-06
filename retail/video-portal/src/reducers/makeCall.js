const callReducerDefaultState = null;

export const makeCallReducer = (state = callReducerDefaultState, action) => {
  
  switch (action.type) {    
    case "INITIALIZE_CALL":
      return action.id;
      
    case "RINGING":
      return action.res;
    
    case "ENDED":
      return action.res;
      
    case "END_CALL":
      return action.res;

    case "BUSY":
      return action.res;
        
    case "WEB_ANSWERED":
      return action.res;
    
    case "CALL_ATTENDED":
      return action.res;
    
    case "CALL_ATTENDED_ALREADY":
      return action.res;

    case "QUEUE_COUNT":
      return action.res;

    default:
      return state;
  }
};
                 