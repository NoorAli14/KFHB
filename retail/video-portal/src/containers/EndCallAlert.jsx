import EndCallAlert from '../components/EndCallAlert';
import { connect } from "react-redux";
import { endCallAction } from '../actions/callActions';
import { resetPermission } from '../actions/requestPermissionAction';


const mapStateToProps = (state, props) => {
    return ({
        devicePermission: state.devicePermission,
        call: state.call,
    })
};

const mapDispatchToProps = (dispatch, props) => ({
    endCallAction: (callType, toSocketId, callId) => dispatch(endCallAction(true, callType, toSocketId, callId)),
    resetPermission: (value) => dispatch(resetPermission(value))
});


export default connect(mapStateToProps, mapDispatchToProps)(EndCallAlert)