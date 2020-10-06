import React from 'react';

class OnAnotherCall extends React.Component {
    constructor(props) {
        super(props)
        this.closeHandler = this.closeHandler.bind(this)
    }

    closeHandler() {
        this.props.closeHandler();
    }

    render() {
        return (
            <div className="logout-alert">
                <div className="logout">
                    <p className="logout-header">Warning!</p>
                    <p>You cant make another call while you're already on call.</p>
                    <div>
                        <button className="cancel-btn" onClick={this.closeHandler}>Close</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default OnAnotherCall;