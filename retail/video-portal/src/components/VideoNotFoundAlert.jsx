import React from 'react';


class VideoNotFoundAlert extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoNotFound: false,
            videoMessage:null
        }
        this.closeHandler = this.closeHandler.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("VideoNotFound",this.props)
        if (prevProps.videoErrorReducer !== this.props.videoErrorReducer) {
            if (this.props.videoErrorReducer.status === 400 || this.props.videoErrorReducer.status === 401) {
                this.setState({
                    videoNotFound: true,
                    videoMessage: this.props.videoErrorReducer.message
                })
            }
        }
    }

    closeHandler() {
        this.setState({
            videoNotFound: false
        })
    }

    render() {
        let {videoNotFound, videoMessage} = this.state;
        return (
            <>{videoNotFound &&
                <div className="videoError-alert">
                <div className="videoError">
                <p className="videoError-header">Warning</p>
                            <p>{videoMessage}</p>
                            <div>
                                <button onClick={this.closeHandler}>Close</button>
                            </div>
                        </div>
                    </div>}
            </>
        )
    }

}

export default VideoNotFoundAlert