import React from "react";
import { Link } from 'react-router-dom';
import { ReactComponent as Dashboard1 } from '../assets/images/dashboard.svg';
import { ReactComponent as Customer } from '../assets/images/customer.svg';
import { ReactComponent as Settings } from '../assets/images/settings.svg';
import "../assets/scss/style.scss";
import "react-tabs/style/react-tabs.css";
import LogoutAlert from "./LogoutAlert";
const createHistory = require("history").createBrowserHistory;
export const history = createHistory();

const SDK = window.SDK;

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            doLogout: false
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.closeLogout = this.closeLogout.bind(this);
        this.openLogout = this.openLogout.bind(this);
    }

    handleLogout() {
        SDK.logout("1234567890");
        let elt = document.getElementById("video-popup");
        elt.style.backgroundColor = "#fff";
        elt.style.visibility = "hidden";
        let videoControlEle = document.getElementById("videocall-controls-overlay");
        videoControlEle.style.visibility = "hidden";
        history.push('/');
    }

    openLogout() {
        this.setState({
            doLogout: true
        })
    }

    closeLogout() {
        this.setState({
            doLogout: false
        })
    }

    render() {
        let { doLogout } = this.state
        return (
            <>
                <div className="sidebar">
                    <ul>
                        <li>
                            <Link to="/dashboard" activeClassName="active"><i><Dashboard1 /></i><span>Dashboard</span></Link>
                        </li>
                        <li>

                            <Link to="/customerlist" activeClassName="active"><i><Customer /></i><span>Customer details</span></Link>
                        </li>
                        <li>

                            <Link to="/customerlist" activeClassName="active"><i><Settings /></i><span>Settings</span></Link>
                        </li>
                        <li>

                            <Link to="#" onClick={this.openLogout}> <i><Settings /></i><span>Logout</span></Link>
                        </li>
                    </ul>
                    {doLogout && <LogoutAlert closeHandler={this.closeLogout} logoutHandler={this.handleLogout} />}
                </div>
            </>
        );
    }
}

export default Sidebar;