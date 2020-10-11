const SDK = window.SDK;

export const initializeCall = id => ({
  type: "INITIALIZE_CALL",
  id
});

export const receiveCall = res => ({
  type: "RECEIVE_CALL",
  res
});

export const callRinging = res => ({
  type: "RINGING",
  res
});

export const callEnded = res => ({
  type: "ENDED",
  res
});

export const callEndedIQ = res => ({
  type: "END_CALL",
  res
});

export const callBusy = res => ({
  type: "BUSY",
  res
});

export const callAttended = res => ({
  type: "CALL_ATTENDED",
  res
});

export const callAttendedAlready = res => ({
  type: "CALL_ATTENDED_ALREADY",
  res
});

export const webAnswered = res => {
  return ({
    type: "WEB_ANSWERED",
    res
  })
}

export const queueCount = res => {
  return ({
    type: "QUEUE_COUNT",
    res
  })
}

export const startInitializeCall = (type,user) => async  dispatch => {
  SDK.AVCallInitialize(window._env_.REACT_APP_SIGNAL_SERVER,"OUT_GOING");
  dispatch(initializeCall({user}))
};
