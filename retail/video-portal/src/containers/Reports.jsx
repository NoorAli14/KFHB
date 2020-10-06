import { connect } from "react-redux";
import Reports from "../components/Reports";
import { videoErrorAction } from '../actions/videoErrorAction';


const mapStateToProps = (state, props) => {
    return ({
        loginToken: state.loginToken
    })
};

const mapDispatchToProps = (dispatch, props) => ({
    videoErrorAction: (data) => dispatch(videoErrorAction(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Reports);