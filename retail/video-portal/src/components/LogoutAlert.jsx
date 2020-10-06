import React from 'react';
import { Link } from 'react-router-dom';
import { removeLocalStorage } from '../utils';


class LogoutAlert extends React.Component {
    constructor(props) {
        super(props)
        this.confirmHandler = this.confirmHandler.bind(this)
        this.cancelHandler = this.cancelHandler.bind(this)
    }

    cancelHandler() {
        this.props.closeHandler();
    }

    confirmHandler() {

        removeLocalStorage('token',
            'access-token',
            'userId',
            'actionType',
            'callStatus',
            'callerSocketId',
            'callerName',
            'type',
            'callResponse',
            "registerData")
        this.props.logoutHandler();
    }

    render() {
        return (
            <div className="logout-alert">
                <div className="logout">
                    <p className="logout-header">Logout</p>
                    <p>Are you sure you want to logout?</p>
                    <div>
                        <button className="cancel-btn" onClick={this.cancelHandler}>Cancel</button>
                        <button className="confirm-btn" onClick={this.confirmHandler}><Link to="/">Confirm</Link></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LogoutAlert;