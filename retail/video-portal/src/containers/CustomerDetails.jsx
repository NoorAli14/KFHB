
import { connect } from "react-redux";
import { answerCallAction } from '../actions/receiverAction';
import { muteCallAction, unmuteCallAction, endCallAction } from '../actions/callActions';
import CustomerDetails from "../components/CustomerDetails";

const mapStateToProps = (state, props) => {
    return ({
        call: state.call,
        receiveCall: state.receiveCall,
        callAction: state.callAction,
        login: state.login,
        callMuted: state.muteReducer
    })
};
const mapDispatchToProps = (dispatch, props) => ({
    answerCallAction: (type, jid) => dispatch(answerCallAction(type, jid)),
    muteCallAction: (socketId, type, muteType) => dispatch(muteCallAction(socketId, type, muteType)),
    unmuteCallAction: (socketId, type, unmuteType) => dispatch(unmuteCallAction(socketId, type, unmuteType)),
    endCallAction: (callType, toSocketId, callId) => dispatch(endCallAction(true, callType, toSocketId, callId))
});



export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetails);