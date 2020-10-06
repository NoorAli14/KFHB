import CameraAlert from '../components/CameraAlert';
import { connect } from "react-redux";
import { requestCameraPermission, resetPermission } from '../actions/requestPermissionAction';


const mapStateToProps = (state, props) => {
    return ({
        devicePermission: state.devicePermission
    })
};

const mapDispatchToProps = (dispatch, props) => ({
    requestCameraPermission: (value) => dispatch(requestCameraPermission(value)),
    resetPermission: (value) => dispatch(resetPermission(value))
});


export default connect(mapStateToProps, mapDispatchToProps)(CameraAlert)