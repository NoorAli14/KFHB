const callReducerDefaultState = {};

export const requestPermission = (state = callReducerDefaultState, action) => {

  switch (action.type) {

    case "DEVICE_PERMISSION":
      return action.device;

    case "RESET_PERMISSION":
      return null

    case "END_CALL_PERMISSION":
      return action.request
  
    default:
      return state;
  }
};
