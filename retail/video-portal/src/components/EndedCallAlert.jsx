import React from 'react';
import { setMakeCallStatus, setAttendCarbonCall } from '../utils';

class EndedCallAlert extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showAlert: false,
            warning: "Customer call has been ended."
        }
        this.closeHandler = this.closeHandler.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        // if (prevProps.devicePermission !== this.props.devicePermission) {
        //     if (this.props.devicePermission === "END_CALL") {
        //         this.setState({
        //             showAlert: true,
        //         })
        //     }
        // }
        if (prevProps.call !== this.props.call) {
            if (this.props.call.callStatus === "ENDED" && !localStorage.getItem('selfEnded')) {
                if(this.props.call.isError === undefined || this.props.call.isError === null){
                    this.setState({
                        showAlert: true,
                        warning:"Customer call has been ended."
                    })
                }else{
                    let networkState = localStorage.getItem('networkState');
                    if(networkState === "ONLINE"){
                        this.setState({
                            showAlert: true,
                            warning:"Customer call ended due to internet connectivity or unknown issue."
                        })
                        
                    }else {
                        this.setState({
                            showAlert: true,
                            warning:"Call ended due to limited network connectivity"
                        }) 
                    }
                   
                }
               
            }
        }
    }
    closeHandler() {
        localStorage.removeItem('callerName1')
        this.setState({
            showAlert: false
        })
    }
    
    render() {
        let { showAlert, warning } = this.state;
        return (
            <>
                {showAlert &&
                    <div className="endedcall-alert">
                        <div className="endedcall">
                            {/* <p className="endcall-header">Warning</p> */}
                            {/* <p>{localStorage.getItem('callerName1') +" "+ warning}</p> */}
                            <p>{warning}</p>
                            <div>
                                <button className="cancel-btn" onClick={this.closeHandler}>Ok</button>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }

}

export default EndedCallAlert