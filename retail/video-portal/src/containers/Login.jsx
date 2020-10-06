import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { startUserLogin } from "../actions/login";
import Login from "../components/Login";


const mapStateToProps = (state, props) => ({
  login: state.login
});

const mapDispatchToProps = (dispatch, props) => ({
  startUserLogin: (email, password) => dispatch(startUserLogin(email, password))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));