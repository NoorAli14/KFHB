import React from "react";
import { ReactComponent as AcceptCall } from '../assets/images/acceptcall.svg';
import { ReactComponent as RejectCall } from '../assets/images/rejectcall.svg';
import "../assets/scss/style.scss";
import "react-tabs/style/react-tabs.css";
import CallReceiveTone from '../assets/ringtones/call-receive.mp3';
import RingTone from "./RingTone";
import { getAttendCarbonCall, setAttendCarbonCall, removeLocalStorage, updateIncomingCallDetails } from '../utils';

class Callpopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calling: false,
            type: "",
            callerName: '',
            name: '',
            SocketId: "",
            jid: "",
            status: false,
            incomingCalls: {},
            callCount: 0,
            callDetails: [],
            isAttended:false
        }
        this.attendCallHandler = this.attendCallHandler.bind(this);
        this.declineCallHandler = this.declineCallHandler.bind(this);
    }

    attendCallHandler(callid, type, socketId) {
        const self = this;
        let attendedCall = null;
        let remainingCall = null;
        let { incomingCalls,isAttended } = this.state;
        attendedCall = incomingCalls[callid];
        
        this.setState({
            isAttended:true
        })

        remainingCall = Object.assign({}, incomingCalls);
        delete remainingCall[callid];
        let declineCalls = Object.values(remainingCall);

        localStorage.removeItem('incomingCallDetails')
        localStorage.setItem("callerSocketId", incomingCalls[callid].callerSocketId);
        localStorage.setItem("callerName", incomingCalls[callid].callerName);
        localStorage.setItem("type", incomingCalls[callid].type);
        localStorage.setItem('actionType', "RECEIVE_CALL");
        localStorage.setItem("customerId", incomingCalls[callid].customerId);
        localStorage.setItem("customerName", incomingCalls[callid].customerName);
        localStorage.setItem("callerName1", incomingCalls[callid].customerName);
        localStorage.setItem("callId", callid);
        localStorage.setItem('callResponse', JSON.stringify(incomingCalls[callid]));
        setAttendCarbonCall(true)

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(res => {
                const stream = res;
                let elt = document.getElementById("video-popup");
                elt.style.backgroundColor = "#fff";
                elt.style.visibility = "visible";
                let videoControlEle = document.getElementById("videocall-controls-overlay");
                videoControlEle.style.visibility = "visible";
                self.setState({
                    calling: false
                })
                if (localStorage.getItem('actionType') === "RECEIVE_CALL" && !isAttended) {
                    self.props.answerCallAction(type, socketId, callid);
                    if (Object.keys(incomingCalls).length > 1) {
                        declineCalls.map(cd => {
                            self.props.declineCallAction(cd.callerSocketId, cd.callerName, false, cd.callid, cd.fromSocketId);
                        })
                    }
                }
                stream.getTracks().forEach(function (track) {
                    track.stop();
                });
            })
            .catch(err => {
                self.props.requestCameraPermission("NO_CAMERA")
            })
    }

    declineCallHandler(callid, name, socketId, fromSocketId) {
        let { incomingCalls, callCount, callDetails } = this.state;
        // removeLocalStorage('actionType','callStatus','callerSocketId','callerName','type','callResponse','customerName','customerId')
        setAttendCarbonCall(true);
        if (callCount <= 1) {
            incomingCalls = {};
            updateIncomingCallDetails(incomingCalls);
            localStorage.removeItem('incomingCallDetails');
            this.props.declineCallAction(socketId, name, false, callid, fromSocketId);
            this.setState({
                incomingCalls,
                calling: false,
                callCount: 0,
                callDetails: []
            })
        } else {
            let callCount = 0;
            let callDetails = []
            incomingCalls = delete incomingCalls[callid] ? incomingCalls : {};
            callCount = Object.keys(incomingCalls).length;
            callDetails = Object.values(incomingCalls)
            this.setState({ incomingCalls, callCount, callDetails });
            updateIncomingCallDetails(incomingCalls)
            this.props.declineCallAction(socketId, name, false, callid, fromSocketId);
            localStorage.setItem('incomingCallDetails', JSON.stringify(incomingCalls));

        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.receiveCall !== this.props.receiveCall) {
            this.setState({ status: false });
            if (this.props.receiveCall.callStatus === "INITIALISED") {
                this.setState({
                    // status: true,
                    // calling: false,
                    SocketId: this.props.receiveCall.socketId,
                    type: this.props.receiveCall.callType,
                    callerName: this.props.receiveCall.from,
                    name: this.props.receiveCall.userJID,
                    jid: this.props.receiveCall.from
                })
            }
        }
        if (prevProps.call !== this.props.call) {
            this.setState({ status: false });
            if (this.props.call.callStatus === "CALLING") {
                this.setState({
                    calling: true,
                    incomingCalls: JSON.parse(localStorage.getItem('incomingCallDetails')),
                    callCount: Object.keys(JSON.parse(localStorage.getItem('incomingCallDetails'))).length,
                    callDetails: Object.values(JSON.parse(localStorage.getItem('incomingCallDetails')))
                })
            }
            else if (this.props.call.callStatus === "CALL_DECLINED" && !getAttendCarbonCall()) {
                let { incomingCalls, callCount } = this.state;
                let callid = this.props.call.callId;
                if (incomingCalls != null) {
                    let callDetails = []
                    delete incomingCalls[callid]
                    callCount = Object.keys(incomingCalls).length;
                    callDetails = Object.values(incomingCalls)
                    this.setState({ incomingCalls, callCount, callDetails,isAttended:false });
                    updateIncomingCallDetails(incomingCalls)
                    localStorage.setItem('incomingCallDetails', JSON.stringify(incomingCalls));
                }
            }
            else if (this.props.call.callStatus === "decline_call" || this.props.call.callStatus === "DECLINED") {
                let { incomingCalls, callCount } = this.state;
                let callid = this.props.call.callId;

                if (incomingCalls != null) {
                    let callDetails = []
                    delete incomingCalls[callid]
                    callCount = Object.keys(incomingCalls).length;
                    callDetails = Object.values(incomingCalls)
                    this.setState({ incomingCalls, callCount, callDetails,isAttended:false });
                    updateIncomingCallDetails(incomingCalls)
                    localStorage.setItem('incomingCallDetails', JSON.stringify(incomingCalls));
                }

            }
            else if (this.props.call.callStatus === "CALL_ENDED") {
                this.setState({
                    calling: false,
                    isAttended:false
                })
            } else if (this.props.call.callStatus === "END_CALL") {
                this.setState({
                    calling: false,
                    isAttended:false
                })
            }
            else if (this.props.call.callStatus === "CALL_ATTENDED" && !getAttendCarbonCall()) {
                updateIncomingCallDetails({})
                this.setState({
                    calling: false,
                    isAttended:false
                })
                localStorage.removeItem('incomingCallDetails')
            }
            else if (this.props.call.callStatus === "CALL_ATTENDED_ALREADY") {

                let { incomingCalls, callCount } = this.state;
                let callid = this.props.call.callId;
                if (incomingCalls != null) {
                    let callDetails = []
                    delete incomingCalls[callid]
                    callCount = Object.keys(incomingCalls).length;
                    callDetails = Object.values(incomingCalls)
                    this.setState({ incomingCalls, callCount, callDetails,isAttended:false });
                    updateIncomingCallDetails(incomingCalls)
                    localStorage.setItem('incomingCallDetails', JSON.stringify(incomingCalls));
                }
            } else if (this.props.call.callStatus === "ENDED") {
                this.setState({
                    incomingCalls: {},
                    callCount: 0,
                    callDetails: [],
                    calling: false,
                    isAttended:false
                })
            }
            if(this.props.call.callStatus === "self_decline_call"){
                console.log("this.props.call.",this.props.call);
                this.declineCallHandler(this.props.call.callId, this.props.call.callerName, this.props.call.callerSocketId, this.props.call.fromSocketId)
            }
        }

    }

    render() {

        let { calling, callCount, callDetails, isAttended } = this.state;
        let callerName = "";

        // if (localStorage.getItem('callerName') !== null) {
        //     callerName = localStorage.getItem('callerName').split('@')[0]
        // }
        callerName = localStorage.getItem('customerName');

        return (
            <>
                {calling &&
                    <div>
                        <div className="income-call-container" >
                            <div className="income-call-block">
                                {callDetails.map(cd => {
                                    let gender; 
                                    let name;
                                    const details= cd.customerName.split(':');
                                    if(details && details.length>1){
                                        name= details[0];
                                        gender= details[1].trim();
                                    }
                                     
                                    return <div className="income-call" >
                                        <div style={{display:'flex', flexDirection:'column'}}>
                                        <p>Caller Name: {name}</p>
                                        <p>Agent Preference: {gender=='M' ? 'Male' : (gender=='F' ? 'Female' : 'None')}</p>
                                        </div>
                                        <div className="">
                                            <i><AcceptCall onClick={isAttended? "": () => this.attendCallHandler(cd.callId, cd.type, cd.callerSocketId)} /></i>
                                            <i><RejectCall onClick={() => this.declineCallHandler(cd.callId, cd.callerName, cd.callerSocketId, cd.fromSocketId)} /></i>
                                        </div>
                                    </div>
                                })}
                                {callCount >= 1 && <RingTone audioSrc={CallReceiveTone} />}
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    }
}

export default Callpopup;
