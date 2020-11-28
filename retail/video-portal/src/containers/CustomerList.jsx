import { connect } from "react-redux";
import { startInitializeCall } from "../actions/makeCall";
import CustomerList from '../components/CustomerList';
import { requestCameraPermission } from '../actions/requestPermissionAction';

const mapStateToProps = (state, props) => {
    return ({
        call: state.call
    })
};

const mapDispatchToProps = (dispatch, props) => ({
    startInitializeCall: type => dispatch(startInitializeCall(type)),
    requestCameraPermission: (deviceType) => dispatch(requestCameraPermission(deviceType))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerList);