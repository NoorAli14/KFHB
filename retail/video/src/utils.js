import { store } from './store/configureStore';
import { receiveCall, callRinging, callEnded, callEndedIQ, callBusy, webAnswered, callAttended, queueCount } from './actions/makeCall';
import { audioMuted, videoMuted } from './actions/muteActions';
import { endCallAction } from './actions/callActions';
import CryptLib from 'cryptlib';
export var strophe = false;
export var socketId = "";
const createHistory = require("history").createBrowserHistory;
export const history = createHistory();

var makeCallStatus = '';
var carbonCallAttended = false;
let incomingCallDetails = {};


const SDK = window.SDK;
export const isLogin = () => {
    if (localStorage.getItem("token") && localStorage.getItem("registerData")) {
        return true;
    }

    return false;
}

export var callbacks = {
    connectionListener: function (res) {
        console.log("connectionListener", res)
        if (res === "CONNECTED") {
            strophe = true;
            if (localStorage.getItem('callStatus') === "ON_GOING") {
                let randomNumber = Math.random();
                console.log("websocket initializing")
                SDK.AVCallInitialize(window._env_.REACT_APP_SIGNAL_SERVER, randomNumber, "INCOMING");
            }

        } else {
            console.log("Connection Failed", res)
        }
    },
    callListener: async function (res) {
        // console.log("CALL LISTENER:",res)
        if (res.response === "accepted" && localStorage.getItem('callStatus') === "ON_GOING") {
            let callType = localStorage.getItem('type');
            let toSocketId = localStorage.getItem('callerSocketId');
            let callId = localStorage.getItem("callId");
            console.log("websocket initialized")
            store.dispatch(endCallAction(true, callType, toSocketId, callId))
            removeLocalStorage("actionType",'callStatus', "incomingCallDetails", 'callerSocketId', 'callerName', 'type', 'callResponse', 'customerName', 'customerId', "callId")
        }
       
        else if (res.callStatus === "CALLING" && localStorage.getItem("callStatus") === null) {
            let randomNumber = Math.random();
            setIncomingCallDetails(res, randomNumber);
            localStorage.setItem('actionType', "RECEIVE_CALL")
            localStorage.removeItem('selfEnded')
            SDK.AVCallInitialize(window._env_.REACT_APP_SIGNAL_SERVER, randomNumber, "INCOMING")
            store.dispatch(callRinging(res));
        }
        else if (res.callStatus === "INITIALISED") {
            if (localStorage.getItem('actionType') === "MAKE_CALL") {
                setMakeCallStatus('INITIALISED')
                store.dispatch(callRinging(res));
            } else {
                store.dispatch(receiveCall(res));
            }
        }
        else if (res.callStatus === "ANSWERED") {
            localStorage.setItem('callStatus', "ON_GOING")
            localStorage.removeItem('actionType');
            store.dispatch(callRinging(res));
        }
        else if (res.callStatus === "ENDED") {
            if (localStorage.getItem('callStatus') === "ON_GOING") {
                if(res.isError){
                    // var str = res.message;
                    // var result = str.split("\'");
                   
                    // if(localStorage.getItem('callerSocketId') === result[1]){
                        console.log("error")
                        incomingCallDetails = {}
                        removeLocalStorage("incomingCallDetails", "callId", 'actionType', 'callStatus', 'callerSocketId', 'callerName', 'type', 'callResponse', 'customerName', 'customerId')
                        setMakeCallStatus("ENDED");
                        setAttendCarbonCall(false);
                        store.dispatch(callEnded(res));
                        SDK.updateBusyStatus()
                        console.log("Im free");
                    // }
                    
                }else{
                    console.log("No error")
                    incomingCallDetails = {}
                    removeLocalStorage("incomingCallDetails", "callId", 'actionType', 'callStatus', 'callerSocketId', 'callerName', 'type', 'callResponse', 'customerName', 'customerId')
                    setMakeCallStatus("ENDED");
                    setAttendCarbonCall(false);
                    store.dispatch(callEnded(res));
                }
                
            }

        } else if (res.callStatus === "DECLINED") {
                incomingCallDetails = {}
                setMakeCallStatus("ENDED");
                setAttendCarbonCall(false);
                store.dispatch(callEnded(res));
                if (localStorage.getItem('callStatus') !== "ON_GOING") {
                    removeLocalStorage("incomingCallDetails", 'actionType', 'callStatus', 'callerSocketId', 'callerName', 'callerName1', 'type', 'callResponse', 'customerName', 'customerId')
                }

        }
        else if (res.callStatus === "CALL_DECLINED" && !getAttendCarbonCall()) {
            incomingCallDetails = {}
            setMakeCallStatus("ENDED");
            setAttendCarbonCall(false);
            store.dispatch(callEnded(res));
                removeLocalStorage('actionType', 'callStatus', 'callerSocketId', 'callerName', 'type', 'callResponse', 'customerName', 'customerId')
        }
        else if (res.callStatus === "decline_call") {
            setMakeCallStatus("ENDED");
            setAttendCarbonCall(false);
            store.dispatch(callEnded(res));
            if (localStorage.getItem('callStatus') !== "ON_GOING") {
                removeLocalStorage('actionType','callStatus','callerSocketId','callerName', 'callerName1','type','callResponse','customerName','customerId')
            }
        }
        else if (res.callStatus === "CALL_ENDED") {
            incomingCallDetails = {}
            removeLocalStorage('actionType', 'callStatus', 'callerSocketId', 'callerName', 'type', 'callResponse', 'customerName', 'customerId')
            setMakeCallStatus("ENDED");
            setAttendCarbonCall(false);
            store.dispatch(callEnded(res));
        }
        else if (res.callStatus === "end_call") {
            incomingCallDetails = {}
            removeLocalStorage('actionType', 'callStatus', 'callerSocketId', 'callerName', 'type', 'callResponse', 'customerName', 'customerId')
            setMakeCallStatus("ENDED");
            setAttendCarbonCall(false);
            store.dispatch(callEndedIQ(res));
        }
        else if (res.callStatus === "BUSY") {
            localStorage.removeItem('actionType')
            store.dispatch(callBusy(res))
        } else if (res.callStatus === "WEB_ANSWERED") {
            localStorage.setItem('callStatus', "ON_GOING")
            store.dispatch(webAnswered(res));
        }
        else if (res.callStatus === "CALL_ATTENDED" && !getAttendCarbonCall()) {
            store.dispatch(callAttended(res));
        }
        else if (res.callStatus === "CALL_ATTENDED_ALREADY") {
            removeLocalStorage('actionType', 'callStatus', 'callerSocketId', 'callerName', 'type', 'callResponse', 'customerName', 'customerId')
            setMakeCallStatus("CALL_ATTENDED_ALREADY");
            setAttendCarbonCall(false);
            store.dispatch(callAttended(res));
        }
        else if(res.callStatus == "CALL_COUNT_IN_QUEUE"){
            store.dispatch(queueCount(res))
        }
        else if (res.messageType === "call") {
            if (res.muteType === "AUDIO_MUTE") {
                store.dispatch(audioMuted(res))
            } else if (res.muteType === "VIDEO_MUTE") {
                store.dispatch(videoMuted(res))
            }
        }
    },
    messageListener: function (res) {
        // console.log("messageListener:",res);

        if (res.messageType === "logout") {
            SDK.logout("1234567890");
            window.location.replace('/');
            removeLocalStorage('token', 'access-token', 'userId', 'actionType', 'callStatus', 'callerSocketId', 'callerName', 'type', 'callResponse', 'registerData', 'callId')
        }
        if (res.type === "PING") {
            localStorage.setItem('callerSocketId', res.callerSocketId);
            localStorage.setItem('type', res.callType);
        }
    },
    cameraListener: function (res) {
        // console.log("CAMERA_LISTENER:",res);
    }
}

export const setMakeCallStatus = function (val) {
    makeCallStatus = val;
}

export const getMakeCallStatus = function () {
    return makeCallStatus;
}

export const setAttendCarbonCall = function (val) {
    carbonCallAttended = val;
}

export const getAttendCarbonCall = function () {
    return carbonCallAttended;
}

export const setIncomingCallDetails = function (detail, randomNumber) {
    let key = detail.callId;
    let callerSocketId = detail.socketId;
    let fromSocketId = randomNumber;
    let callerName = detail.from;
    let type = detail.callType;
    let customerId = detail.customerId;
    let customerName = detail.customerName;
    let callResponse = JSON.stringify(detail);
    let userId = localStorage.getItem('userId')
    incomingCallDetails[key] = {
        callerSocketId,
        callerName,
        type,
        customerId,
        customerName,
        callId: key,
        fromSocketId
    }
    localStorage.setItem('incomingCallDetails', JSON.stringify(incomingCallDetails))

    // setTimeout(()=>{
    //     if (localStorage.getItem('callStatus') !== "ON_GOING") {
    //         let msg = {
    //             "messageType": "call",
    //             "callStatus": "self_decline_call",
    //             "fromSocketId" : fromSocketId,
    //             "callerSocketId": callerSocketId,
    //             "callerName":callerName,
    //             "callId": key
    //         }
    //         store.dispatch(callEnded(msg));
    //         console.log("call Id",msg)
    //     }
    // },60000)
    
}

export const updateIncomingCallDetails = function (calls) {
    incomingCallDetails = calls
}

export const removeLocalStorage = function (...items) {
    items.forEach((item) => {
        localStorage.removeItem(item)
    })
}

export const decryptData = function (data, userId) {
    let messagegid = userId + userId + userId;
    let oldmsgcontent = data
    let key = CryptLib.getHashSha256(messagegid, 32);
    let Decryptbody = CryptLib.decrypt(oldmsgcontent, key, window._env_.REACT_APP_IV);
    let result = JSON.parse(Decryptbody);
    return result;
}

export const encryptData = function (data, userId) {
    let messagegid = userId + userId + userId;
    let msgcontent = JSON.stringify(data)
    let key = CryptLib.getHashSha256(messagegid, 32);
    let EncryptData = CryptLib.encrypt(msgcontent, key, window._env_.REACT_APP_IV);
    let result = EncryptData;
    return result;
}
