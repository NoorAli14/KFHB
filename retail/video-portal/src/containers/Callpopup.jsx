import { connect } from "react-redux";
import { answerCallAction, declineCallAction } from '../actions/receiverAction';
import { requestCameraPermission } from '../actions/requestPermissionAction';
import Callpopup from '../components/Callpopup';


const mapStateToProps = (state, props) => {
    return ({
        receiveCall: state.receiveCall,
        call: state.call,
        devicePermission: state.devicePermission
    })
};

const mapDispatchToProps = (dispatch, props) => ({
    answerCallAction: (callType, socketId, callId) => dispatch(answerCallAction(callType, socketId, callId)),
    declineCallAction: (socketId, name, callingStatus, callId, fromSocketId) => dispatch(declineCallAction(socketId, name, callingStatus, callId, fromSocketId)),
    requestCameraPermission: (deviceType) => dispatch(requestCameraPermission(deviceType))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Callpopup);
