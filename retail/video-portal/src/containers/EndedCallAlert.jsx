import EndedCallAlert from '../components/EndedCallAlert';
import { connect } from "react-redux";

const mapStateToProps = (state, props) => {
    return ({
        devicePermission: state.devicePermission,
        call: state.call,
    })
};


export default connect(mapStateToProps, null)(EndedCallAlert)