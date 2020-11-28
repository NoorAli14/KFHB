import { connect } from "react-redux";
import Header from '../components/Header';

const mapStateToProps = (state, props) => {
    return ({
        receiveCall: state.receiveCall,
        call: state.call,
        callAction: state.callAction,
        receiverAction: state.receiverAction
    })
};

export default connect(mapStateToProps)(Header);
