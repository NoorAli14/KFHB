
import { connect } from "react-redux";
import Dashboard from "../components/Dashboard";



const mapStateToProps = (state, props) => {
    return ({
        loginToken: state.loginToken,
        call: state.call
    })
};

export default connect(mapStateToProps, null)(Dashboard);