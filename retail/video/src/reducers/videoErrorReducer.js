
export const videoErrorReducer = (state = [], action) => {
  switch (action.type) {    
    case "VIDEO_NOT_FOUND":
      return action.data;
     
    default:
        return state;
  }
};