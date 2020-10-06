import { connect } from "react-redux";
import CallLog from "../components/CallLog";



const mapStateToProps = (state, props) => {
    return ({
        loginToken: state.loginToken
    })
};

export default connect(mapStateToProps, null)(CallLog);