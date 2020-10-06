
import { connect } from "react-redux";
import { muteCallAction, unmuteCallAction, endCallAction } from '../actions/callActions';
import CallActions from '../components/CallActions';
import { requestEndcallPermission } from '../actions/requestPermissionAction';



const mapStateToProps = (state, props) => {
  return ({
    call: state.call,
    receiveCall: state.receiveCall,
    callAction: state.callAction
  })
};

const mapDispatchToProps = (dispatch, props) => ({
  muteCallAction: (socketId, type, muteType) => dispatch(muteCallAction(socketId, type, muteType)),
  unmuteCallAction: (socketId, type, unmuteType) => dispatch(unmuteCallAction(socketId, type, unmuteType)),
  endCallAction: (callType, toSocketId, callId) => dispatch(endCallAction(true, callType, toSocketId, callId)),
  requestEndcallPermission: (type) => dispatch(requestEndcallPermission(type))
});

export default connect(mapStateToProps, mapDispatchToProps)(CallActions);