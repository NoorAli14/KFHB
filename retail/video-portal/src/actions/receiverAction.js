const SDK = window.SDK;

export const attendCall = res => ({
    type: "ATTEND_CALL",
    res
});

export const declineCall = (res) => ({
    type: "DECLINE_CALL",
    res
})

export const answerCallAction = (type, jid, callId) => dispatch => {
    var mc = SDK.attendAVCall(type,jid,callId);
    dispatch(
        attendCall({
            mc
        })
    );
};

export const declineCallAction = (socketId, name, callingStatus, callId, fromSocketId) => dispatch => {
    SDK.declineAVCall(name,socketId,callId,fromSocketId);
    dispatch(
        declineCall({
            callingStatus
        })
    );
};

