import VideoNotFoundAlert from '../components/VideoNotFoundAlert';
import { connect } from "react-redux";


const mapStateToProps = (state, props) => {
    return ({
        videoErrorReducer: state.videoErrorReducer
    })
};

export default connect(mapStateToProps, null)(VideoNotFoundAlert)