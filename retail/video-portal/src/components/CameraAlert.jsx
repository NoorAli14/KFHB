import React from 'react';

class CameraAlert extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cameraError: false,
            warning: "Please check your web camera/microphone connection."
        }
        this.closeHandler = this.closeHandler.bind(this)
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.devicePermission !== this.props.devicePermission) {
            if (this.props.devicePermission === "NO_CAMERA") {
                this.setState({
                    cameraError: true,
                })
            }
        }
    }
    closeHandler() {
        this.props.resetPermission(null);
        this.setState({
            cameraError: false
        })
    }
    render() {
        let { cameraError, warning } = this.state;
        return (
            <>
                {cameraError &&
                    <div className="network-alert">
                        <div className="network">
                            <p className="network-header">Warning</p>
                            <p>{warning}</p>
                            <div>
                                <button onClick={this.closeHandler}>Close</button>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }

}

export default CameraAlert