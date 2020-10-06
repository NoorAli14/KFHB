import React from 'react';


class NetworkAlert extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            networkError: false
        }
        this.closeHandler = this.closeHandler.bind(this)
    }
    componentDidMount() {
        window.addEventListener("online", this.isOnline, false);
	    window.addEventListener("offline", this.isOffline, false);

    }
    isOnline = ()=>{
        localStorage.setItem('networkState','ONLINE')
        this.setState({
            networkError: false
        })
    }
    isOffline = () =>{
        localStorage.setItem('networkState','OFFLINE')
        this.setState({
            networkError: true
        })
    }
    closeHandler() {
        this.setState({
            networkError: false
        })
    }
    render() {
        let { networkError } = this.state;
        return (
            <>
                {networkError &&
                    <div className="network-alert">
                        <div className="network">
                            <p className="network-header">Warning</p>
                            <p>Please check your internet connectivity</p>
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

export default NetworkAlert