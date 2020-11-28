import { connect } from "react-redux";
import MissedCallLog from "../components/MissedCallLog";



const mapStateToProps = (state, props) => {
    return ({
        loginToken: state.loginToken
    })
};

export default connect(mapStateToProps, null)(MissedCallLog);