import React from "react";
import "../assets/scss/style.scss";
import "react-tabs/style/react-tabs.css";
import axios from 'axios';
import { ReactComponent as MissedCall } from '../assets/images/missedcall.svg';
import { ReactComponent as CallLogs } from '../assets/images/calllogs.svg';
import { ReactComponent as CallQueue } from '../assets/images/callqueue.svg';
import LogTable from "./LogTable";
import { getLoginToken } from '../actions/loginToken';
import { store } from "../store/configureStore";
import { decryptData } from "../utils";
import Loader from "./Loader";

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            totalMissedCall: 0,
            missedcallCount: 0,
            missedcallLog: [],
            totalCall: 0,
            callCount: 0,
            callLog: [],
            queueCount: 0,
            isLoading: false
        }
        this.getCallLog = this.getCallLog.bind(this);
        this.getCustomerCalllog = this.getCustomerCalllog.bind(this);
        this.getQueueCount = this.getQueueCount.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem("callStatus") === null) {
            let elt = document.getElementById("video-popup");
            let videoControlEle = document.getElementById("videocall-controls-overlay");
            elt.style.visibility = "hidden";
            videoControlEle.style.visibility = "hidden";
        }
        this.getCallLog(localStorage.getItem('token'))

        let customerDetails = decryptData(localStorage.getItem('customerDetails'), localStorage.getItem('userId'));
        let  role= customerDetails.roles[0].name.toLowerCase();
        if (role === "super admin") {
            this.props.history.push('/reports')
        }
    }

    getCallLog(token) {
        const self = this;
        let data = localStorage.getItem('registerData');
        let result = decryptData(data, localStorage.getItem('userId'))
        this.setState({
            isLoading: true
        })
        axios.get(window._env_.REACT_APP_BASE_URL + "/chat/calls", {
            params: {
                status: 0
            }, headers: { "Authorization": token }
        })
            .then(res => {
                if (res.data.status === 200) {
                    self.setState({
                        missedcallCount: res.data.count,
                        missedcallLog: res.data.data,
                        totalMissedCall: res.data.totalRecords,
                        isLoading: false
                    })
                    this.getCustomerCalllog(localStorage.getItem('token'))
                } else if (res.data.status === 204) {
                    this.setState({
                        isLoading: false
                    })
                    this.getCustomerCalllog(localStorage.getItem('token'))
                }
            })
            .catch(error => {
                console.log(error)
                store.dispatch(getLoginToken(result.username, result.webAccessToken))
            })
    }

    getCustomerCalllog(token) {
        const self = this;
        let data = localStorage.getItem('registerData');
        let result = decryptData(data, localStorage.getItem('userId'))
        this.setState({
            isLoading: true
        })
        //API for Call Logs
        axios.get(window._env_.REACT_APP_BASE_URL + "/chat/calls", {
            params: {
                status: 1
            }, headers: { "Authorization": token }
        })
            .then(res => {
                if (res.data.status === 200) {

                    self.setState({
                        isLoading: false
                    })
                    self.setState({
                        callCount: res.data.count,
                        callLog: res.data.data,
                        totalCall: res.data.totalRecords
                    })
                    this.getQueueCount(localStorage.getItem('token'))
                }
                if (res.data.status === 401) {
                    console.log(res)
                }
                else if (res.data.status === 204) {
                    self.setState({
                        isLoading: false
                    })
                    this.getQueueCount(localStorage.getItem('token'))
                }
            })
            .catch(error => {
                console.log(error)
                store.dispatch(getLoginToken(result.username, result.webAccessToken))
            })
    }

    getQueueCount(token) {
        const self = this;
        let data = localStorage.getItem('registerData');
        let result = decryptData(data, localStorage.getItem('userId'))
        this.setState({
            isLoading: true
        })
        //API for Call Logs
        axios.get(window._env_.REACT_APP_BASE_URL + "/chat/calls/queueCount", {
            params: {
                status: 1
            }, headers: { "Authorization": token }
        })
            .then(res => {
                if (res.data.status === 200) {

                    self.setState({
                        isLoading: false,
                        queueCount: res.data.data.Count
                    })
                }
                if (res.data.status === 401) {
                    console.log(res)
                }
                else if (res.data.status === 204) {
                    self.setState({
                        isLoading: false
                    })
                }
            })
            .catch(error => {
                console.log(error)
                store.dispatch(getLoginToken(result.username, result.webAccessToken))
            })
    }



    componentDidUpdate(prevProps, prevState) {
        if (prevProps.loginToken !== this.props.loginToken) {
            if (this.props.loginToken.res.data.status === 200) {
                this.getCallLog(this.props.loginToken.res.data.data.token)
            }
        }
        if (prevProps.call !== this.props.call) {
            if (this.props.call.callStatus === "ENDED" || this.props.call.callStatus === "CALL_ENDED" || this.props.call.callStatus === "END_CALL" || this.props.call.callStatus === "decline_call") {
                this.getCallLog(localStorage.getItem('token'))
            }
            if (this.props.call.callStatus === "CALL_COUNT_IN_QUEUE") {
                this.setState({
                    isLoading: false,
                    queueCount: this.props.call.queueCount
                })
            }
        }
    }


    render() {
        let { totalCall, totalMissedCall, callCount, missedcallCount, queueCount, isLoading } = this.state;
        return (
            <>
                {isLoading && <Loader />}
                <div className="grid-container">
                    <div className="dashboard-container">
                        <div className="card-block">
                            <div className="dash-card one">
                                <div className="dash-icon">
                                    <i><MissedCall /></i>
                                </div>
                                <div className="card-details">
                                    <h4>Missed calls</h4>
                                    <span>{totalMissedCall}</span>
                                </div>
                            </div>
                            <div className="dash-card two">
                                <div className="dash-icon">
                                    <i><CallLogs /></i>
                                </div>
                                <div className="card-details">
                                    <h4>Call logs of the day</h4>
                                    <span>{totalCall}</span>
                                </div>
                            </div>
                            <div className="dash-card three">
                                <div className="dash-icon">
                                    <i><CallQueue /></i>
                                </div>
                                <div className="card-details">
                                    <h4>Calls in queue</h4>
                                    <span>{queueCount}</span>
                                </div>
                            </div>
                        </div>
                        <LogTable totalMissedCall={this.state.totalMissedCall} totalCall={this.state.totalCall} missedcallLog={this.state.missedcallLog} missedcallCount={missedcallCount} callLog={this.state.callLog} callCount={callCount} />
                    </div>
                </div>
            </>
        );
    }
}

export default Dashboard;