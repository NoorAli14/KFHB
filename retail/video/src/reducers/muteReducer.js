const muteReducerDefaultState = null;

export const muteReducer = (state = muteReducerDefaultState, action) => {
  
  switch (action.type) {    
    case "AUDIO_MUTE":
      return action.msg;
      
    case "VIDEO_MUTE":
      return action.msg;

    default:
      return state;
  }
};
                 