import React from 'react';
import { setMakeCallStatus, setAttendCarbonCall } from '../utils';

class EndCallAlert extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showAlert: false,
            warning: "Are you sure you want to end the call?"
        }
        this.confirmHandler = this.confirmHandler.bind(this)
        this.closeHandler = this.closeHandler.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.devicePermission !== this.props.devicePermission) {
            if (this.props.devicePermission === "END_CALL") {
                this.setState({
                    showAlert: true,
                })
            }
        }
        if (prevProps.call !== this.props.call) {
            if (this.props.call.callStatus === "ENDED" || this.props.call.callStatus === "CALL_ENDED" || this.props.call.callStatus === "END_CALL") {
                this.props.resetPermission(null);
                this.setState({
                    showAlert: false,
                })
            }
        }
    }
    closeHandler() {
        this.props.resetPermission(null);
        this.setState({
            showAlert: false
        })
    }
    confirmHandler() {
        // let callDetails = JSON.parse(localStorage.getItem('incomingCallDetails'));
        // this.props.endCallAction(callDetails.type,callDetails.callerSocketId);
        localStorage.setItem('selfEnded',true)
        localStorage.removeItem('callerName1')
        this.props.endCallAction(localStorage.getItem('type'), localStorage.getItem('callerSocketId'), localStorage.getItem('callId'));
        this.props.resetPermission(null);
        setMakeCallStatus("ENDED");
        setAttendCarbonCall(false);
        this.setState({
            showAlert: false
        })
    }
    render() {
        let { showAlert, warning } = this.state;
        return (
            <>
                {showAlert &&
                    <div className="endcall-alert">
                        <div className="endcall">
                            <p className="endcall-header">Warning</p>
                            <p>{warning}</p>
                            <div>
                                <button className="cancel-btn" onClick={this.closeHandler}>Cancel</button>
                                <button className="confirm-btn" onClick={this.confirmHandler}>Confirm</button>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }

}

export default EndCallAlert