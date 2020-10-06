import Sidebar from '../components/Sidebar';
import { connect } from "react-redux";
import { userLogout } from '../actions/login';


const mapStateToProps = (state, props) => ({
    login: state.login
});

const mapDispatchToProps = (dispatch, props) => ({
    userLogout: (val) => dispatch(userLogout(val))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar);