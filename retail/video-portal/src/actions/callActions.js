import {removeLocalStorage, updateIncomingCallDetails} from '../utils';

const SDK = window.SDK;

export const muteCall = res => ({
    type: "MUTE_CALL",
    res
})

export const unmuteCall = res => ({
    type: "UNMUTE_CALL",
    res
})

export const endCall = res => ({
    type: "END_CALL",
    res
})

export const muteCallAction = (socketId, type, muteType) => async dispatch => {
    if (muteType === "audio") {
        let mc = SDK.audioAVMute(socketId, type);
        dispatch(
            muteCall({
                mc
            })
        );
    }
    else if (muteType === "video") {
        let mc = SDK.videoAVMute(socketId, type);
        dispatch(
            muteCall({
                mc
            })
        );
    }
};

export const unmuteCallAction = (socketId, type, unmuteType) => async dispatch => {
    if (unmuteType === "audio") {
        let mc = SDK.audioAVUnMute(socketId, type);
        dispatch(
            muteCall({
                mc
            })
        );
    }
    else if (unmuteType === "video") {
        let mc = SDK.videoAVUnMute(socketId, type);
        dispatch(
            muteCall({
                mc
            })
        );
    }
};

export const endCallAction = (endCallStatus, type, toSocketId, callId) => async dispatch => {
    updateIncomingCallDetails({})
    removeLocalStorage('actionType');
    console.log("inside endCallAction")
    localStorage.removeItem('incomingCallDetails');

    // removeLocalStorage('actionType','callStatus','callerSocketId','callerName','type','callResponse','customerName','customerId')
    // debugger
    SDK.endAVCall(type, toSocketId, callId);
    dispatch(
        muteCall({
            endCallStatus
        })
    );
};