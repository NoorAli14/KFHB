import React from "react";
import "../assets/scss/style.scss";
import "react-tabs/style/react-tabs.css";
import { getLoginToken } from '../actions/loginToken';
import { store } from "../store/configureStore";
import { decryptData } from "../utils";
import axios from 'axios';
import { ReactComponent as Norecords } from '../assets/images/norecord.svg';
import Loader from "./Loader";
import { ReactComponent as Leftarrow } from '../assets/images/leftarrow.svg';
import { ReactComponent as Rightarrow } from '../assets/images/rightarrow.svg';
import { Link } from 'react-router-dom'

class CallLog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            callCount: 0,
            callLog: [],
            isLoading: false,
            page: 0, //page number for search query
            pageSize: 5, //number of pages to be displayed in pagination default=5
            itemPerPage: 10, //item count per page default=5
            totalItem: 0, //default=0
            totalPage: 0, //default=0,
            startPage: 1, //for looping to append paginations default=1
            activePage: 1,
            buttonDisabled: false
        }

        this.getCallLog = this.getCallLog.bind(this);
        this.pageSizeHandler = this.pageSizeHandler.bind(this);
        this.paginationHandler = this.paginationHandler.bind(this);
        this.nextprevHandler = this.nextprevHandler.bind(this);
        this.getCallDate = this.getCallDate.bind(this);
        this.getDuration = this.getDuration.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem("callStatus") === null) {
            let elt = document.getElementById("video-popup");
            let videoControlEle = document.getElementById("videocall-controls-overlay");
            elt.style.visibility = "hidden";
            videoControlEle.style.visibility = "hidden";
        }

        let customerDetails = decryptData(localStorage.getItem('customerDetails'), localStorage.getItem('userId'));
        let role = localStorage.getItem('userRole')

        if (role === "admin") {
            this.props.history.push('/reports')
        }

        this.getCallLog(localStorage.getItem('token'))
    }

    getCallLog(token) {
        const self = this;
        let { page, itemPerPage, callCount } = this.state;
        let data = localStorage.getItem('registerData');
        let result = decryptData(data, localStorage.getItem('userId'))
        this.setState({
            isLoading: true,
            buttonDisabled: true
        })
        axios.get(window._env_.REACT_APP_BASE_URL + "/chat/calls", {
            params: {
                status: 1, page, size: itemPerPage
            }, headers: { "Authorization": token }
        })
            .then(res => {
                if (res.data.status === 200) {
                    self.setState({
                        callCount: res.data.count,
                        callLog: res.data.data,
                        isLoading: false,
                        buttonDisabled: false,
                        totalItem: res.data.totalRecords ? res.data.totalRecords : 0
                    })
                }
                else if (res.data.status === 401) {
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

    paginationHandler(e, id) {
        this.setState({
            page: id - 1,
            activePage: id
        }, () => this.getCallLog(localStorage.getItem('token')))
    }

    pageSizeHandler(e) {
        this.setState({
            itemPerPage: e.target.value,
            startPage: 1,
            pageSize: 5,
            page: 0,
            activePage: 1
        }, () => this.getCallLog(localStorage.getItem('token')))

    }

    nextprevHandler(dir) {
        let { itemPerPage, totalItem, totalPage, startPage, pageSize, activePage, page } = this.state;
        totalPage = Math.ceil(totalItem / itemPerPage);
        if (dir === "next") {
            if (pageSize === totalPage || pageSize >= totalPage) {
                if (activePage === totalPage) {
                    return
                } else {
                    activePage = activePage + 1;
                    page = page + 1;
                    this.setState({
                        activePage,
                        page
                    }, () => this.getCallLog(localStorage.getItem('token')))
                }
            } else {
                startPage = startPage + 1;
                pageSize = pageSize + 1;
                activePage = activePage + 1;
                page = page + 1;
                this.setState({
                    startPage,
                    pageSize,
                    activePage,
                    page
                }, () => this.getCallLog(localStorage.getItem('token')))
            }

        } else if (dir === "prev") {
            if (pageSize <= 5) {
                if (activePage === 1) {
                    return
                } else {
                    activePage = activePage - 1;
                    page = page - 1;
                    this.setState({
                        activePage,
                        page
                    }, () => this.getCallLog(localStorage.getItem('token')))
                }
            } else {
                startPage = startPage - 1;
                pageSize = pageSize - 1;
                activePage = activePage - 1;
                page = page - 1;
                this.setState({
                    startPage,
                    pageSize,
                    activePage,
                    page
                }, () => this.getCallLog(localStorage.getItem('token')))
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.loginToken !== this.props.loginToken) {
            if (this.props.loginToken.res.data.status === 200) {
                this.getCallLog(this.props.loginToken.res.data.data.token)
            }
        }
    }

    getCallDate(date) {
        let dateStr = date;
        let dateObj = new Date(dateStr);
        let dateFormat = dateObj.toLocaleDateString();
        let timeFormat = ''

        let hour = dateObj.getHours()
        let minute = dateObj.getMinutes()

        let date1 = new Date(); // UTC
        let localHour = hour - date1.getTimezoneOffset() / 60;
        let localMinute = (localHour % 1) * 60;

        localHour = Math.floor(localHour);
        localMinute += parseInt(minute);
        if (localMinute >= 60) {
            localHour += Math.floor(localMinute / 60);
            localMinute %= 60;
        }

        localHour %= 24;
        timeFormat = (localHour <= 9 ? "0" + localHour : localHour).toString() + ":" + (localMinute <= 9 ? "0" + localMinute : localMinute).toString()

        return (timeFormat);
    }

    getDuration(time) {
        var ms = time;
        let min = Math.floor((ms / 1000 / 60) << 0);
        let seconds = Math.floor((ms / 1000) % 60);
        return ((min <= 9 ? "0" + min : min) + ":" + (seconds <= 9 ? "0" + seconds : seconds))
    }

    render() {
        let { buttonDisabled, callLog, callCount, isLoading, pageSize, itemPerPage, totalItem, totalPage, startPage, activePage } = this.state;
        let firstRecord = activePage === 1 ? activePage : ((activePage * itemPerPage) - itemPerPage) + 1;
        let dummy = activePage * itemPerPage;
        let lastRecord = dummy >= totalItem ? totalItem : dummy;
        totalPage = Math.ceil(totalItem / itemPerPage);
        if (totalPage <= 5) {
            pageSize = totalPage
        } else {
            pageSize = pageSize
        }

        let list = [];
        for (let i = startPage; i <= pageSize; i++) {
            list[i] = i
        }

        return (
            <>{isLoading && <Loader />}
                <div className="grid-container">
                    <div className="reports-grid ">
                        <div className="calllogs-grid">
                            <Link to="/dashboard" className="back"><i><Leftarrow /></i><span>Back</span></Link>
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            Customer Name
                                        </th>
                                        <th>
                                            Time
                                        </th>
                                        <th>
                                            Duration
                                        </th>
                                    </tr>
                                </thead>
                                {callCount <= 0 ?
                                    <tbody>
                                        <tr className="no-record" >
                                            <td colSpan="3">
                                                <Norecords />
                                                <p>No records found</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                    :
                                    <tbody>
                                        {callLog.map((log, index) => {

                                            return <tr key={index}>
                                                <td>{log.fromUser}</td>
                                                <td>{this.getCallDate(log.createdAt)}</td>
                                                <td>{this.getDuration(log.duration)}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                }
                            </table>
                            {totalItem <= 10 ?
                                <></>
                                :
                                <div className="table-footer">
                                    <div>
                                        <span>Showing: &nbsp; {firstRecord}-{lastRecord} of {totalItem} &nbsp;&nbsp; </span>
                                    </div>
                                    <div>
                                        <span>Show</span>
                                        <select name="" id="" onChange={(e) => this.pageSizeHandler(e)}>
                                            <option value={10} selected>10</option>
                                            <option value={15}>15</option>
                                            <option value={20}>20</option>
                                        </select>
                                    </div>
                                    <ul className="pagination">
                                        <li className={activePage === 1 || buttonDisabled ? "disable-prevnext" : ""} onClick={activePage === 1 || buttonDisabled ? "" : () => this.nextprevHandler("prev")}><i><Leftarrow /></i></li>
                                        {list.map(i => {
                                            return <li className={activePage === i ? "active" : " "} onClick={(e) => this.paginationHandler(e, i)}><span>{i}</span></li>
                                        })}
                                        <li className={activePage === totalPage || buttonDisabled ? "disable-prevnext" : ""} onClick={activePage === totalPage || buttonDisabled ? "" : () => this.nextprevHandler("next")}><i><Rightarrow /></i></li>
                                    </ul>
                                </div>}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default CallLog;