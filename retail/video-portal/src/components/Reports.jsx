import React from "react";
import "../assets/scss/style.scss";
import "react-tabs/style/react-tabs.css";
import { ReactComponent as Report } from '../assets/images/report.svg';
import { ReactComponent as Leftarrow } from '../assets/images/leftarrow.svg';
import { ReactComponent as Rightarrow } from '../assets/images/rightarrow.svg';
import { ReactComponent as Sort } from '../assets/images/sorting.svg';
import { getLoginToken } from '../actions/loginToken';
import { store } from "../store/configureStore";
import { decryptData, encryptData } from "../utils";
import axios from 'axios';
import Loader from "./Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ReactComponent as Norecords } from '../assets/images/norecord.svg';

class Reports extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            logCount: 0,
            logList: [],
            isLoading: false,
            page: 0, //page number for search query default=1
            search: null, //search string default=null
            pageSize: 5, //number of pages to be displayed in pagination default=5
            totalItem: 0, //default=0
            totalPage: 0, //default=0
            startPage: 1, //for looping to append paginations default=1
            activePage: 1,
            agentSort: null,
            customerSort: null,
            dateSort: null,
            buttonDisabled: false,
            itemPerPage: 10, //item count per page default=10
            startDate: null, //new Date(), //start date for date search()
            endDate: null, //new Date(), //end date for date search()
            fromDate: null,
            toDate: null,
            videoNotFound:false,
            videoErrorMessage:null
        }
        //pagination, searching, sorting
        this.pageSizeHandler = this.pageSizeHandler.bind(this);
        this.paginationHandler = this.paginationHandler.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        this.sortHandler = this.sortHandler.bind(this);
        this.nextprevHandler = this.nextprevHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.downloadFileHandler = this.downloadFileHandler.bind(this);

        this.getReports = this.getReports.bind(this);
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
        let role = customerDetails.roles[0].name.toLowerCase();
        if (role === "agent") {
            this.props.history.push('/dashboard')
        }
        this.getReports(localStorage.getItem('token'));

    }

    paginationHandler(e, id) {
        this.setState({
            page: id - 1,
            activePage: id
        }, () => this.getReports(localStorage.getItem('token')))
    }

    pageSizeHandler(e) {
        this.setState({
            itemPerPage: e.target.value,
            startPage: 1,
            pageSize: 5,
            page: 0,
            activePage: 1
        }, () => this.getReports(localStorage.getItem('token')))

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
                    }, () => this.getReports(localStorage.getItem('token')))
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
                }, () => this.getReports(localStorage.getItem('token')))
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
                    }, () => this.getReports(localStorage.getItem('token')))
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
                }, () => this.getReports(localStorage.getItem('token')))
            }
        }
    }

    searchHandler(e) {
        // this.setState({
        //     search: e.target.value
        // }, () => {
        //     let { search } = this.state
        //     if (search.length >= 4) {
        //         this.getReports(localStorage.getItem('token')
        //         )
        //     }
        // })
        this.setState({
            search: e.target.value,
            page: 0
        }, () => {
            let { search } = this.state
            if (search.length === 0) {
                this.getReports(localStorage.getItem('token'))
            }
        })
    }

    sortHandler(type) {
        if (type === "agentSort") {
            this.setState({
                agentSort: this.state.agentSort === null ? "asc" : (this.state.agentSort === "asc" ? "desc" : "asc"),
                customerSort: null,
                dateSort: null
            }, () => this.getReports(localStorage.getItem('token')))
        } else if (type === "customerSort") {
            this.setState({
                agentSort: null,
                customerSort: this.state.customerSort === null ? "asc" : (this.state.customerSort === "asc" ? "desc" : "asc"),
                dateSort: null
            }, () => this.getReports(localStorage.getItem('token')))
        } else if (type === "dateSort") {
            this.setState({
                agentSort: null,
                customerSort: null,
                dateSort: this.state.dateSort === null ? "asc" : (this.state.dateSort === "asc" ? "desc" : "asc")
            }, () => this.getReports(localStorage.getItem('token')))
        }
    }

    onSubmitHandler(e) {
        e.preventDefault();
        this.setState({
            startPage: 1,
            pageSize: 5,
            page: 0,
            activePage: 1
        }, () => this.getReports(localStorage.getItem('token')))


    }
    getReports(token) {
        let { page, itemPerPage, search, agentSort, customerSort, fromDate, toDate, dateSort } = this.state;
        let data = localStorage.getItem('registerData');
        let result = decryptData(data, localStorage.getItem('userId'))
        let self = this;

        this.setState({
            isLoading: true,
            buttonDisabled: true
        })

        let agentSorting = null;
        let customerSorting = null;
        let dateSorting = null;

        if (agentSort) {
            agentSorting = "desc"
        }
        if (customerSort) {
            customerSorting = "desc"
        }
        if (dateSort) {
            dateSorting = "desc"
        }
        if (search === "") {
            search = null;
        }

        axios.get(window._env_.REACT_APP_BASE_URL + "/chat/calls", {
            params: {
                status: 1,
                page,
                size: itemPerPage,
                search: search,
                fromUserSort: customerSort,
                toUserSort: agentSort,
                sortByDate: dateSort,
                fromDate,
                toDate
            }, headers: { "Authorization": token }
        })
            .then(res => {
                if (res.data.status === 200) {
                    self.setState({
                        logCount: res.data.count,
                        logList: res.data.data,
                        isLoading: false,
                        buttonDisabled: false,
                        totalItem: res.data.totalRecords ? res.data.totalRecords : 0
                    })
                }
                else if (res.data.status === 204) {
                    self.setState({
                        isLoading: false
                    })
                }
            })
            .catch(error => {
                //console.log(error)
                store.dispatch(getLoginToken(result.username, result.webAccessToken))
            })
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

        return (dateFormat + " " + timeFormat);
    }

    convertUTCDateToLocalDate = (date) => {
        var newDate = new Date(date.getTime()-date.getTimezoneOffset()*60*1000);
        // var offset = date.getTimezoneOffset() / 60;
        // var hours = date.getHours();
        // console.log("offset",offset)
        // console.log("hours",hours)
        // newDate.setHours(hours - offset);
        // console.log(newDate.setHours(hours - offset))
        return newDate;   
    }

    getDuration(time) {
        var ms = time;
        let min = Math.floor((ms / 1000 / 60) << 0);
        let seconds = Math.floor((ms / 1000) % 60);
        return ((min <= 9 ? "0" + min : min) + ":" + (seconds <= 9 ? "0" + seconds : seconds))
    }

    downloadFileHandler(fileToken) {
        let data = localStorage.getItem('registerData');
        let result = decryptData(data, localStorage.getItem('userId'))
        let self = this;
        let encryptedPassword = encryptData(result.webAccessToken, localStorage.getItem('userId'))
        this.setState({isLoading:true})
        axios.post(window._env_.REACT_APP_BASE_URL + "/login", {
            "accessToken": encryptedPassword,
            "type": "WEB",
            "username": result.username
        })
            .then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem("token", res.data.data.token);
                    let token = res.data.data.token
                    axios.get(window._env_.REACT_APP_BASE_URL + "/media/fileExists/" + fileToken,{headers:{
                        'Authorization':res.data.data.token
                    }} )
                    .then(res =>{
                        if(res.data.status === 200){
                            this.setState({isLoading:false})
                            let downloadlink = window._env_.REACT_APP_BASE_URL + "/media/callRecording/" + fileToken + "?mf=" + token
                            var a = document.getElementById('downloadLink'); //or grab it by tagname etc
                            a.href = downloadlink;
                            a.click()
                        }else if (res.data.status === 400 || res.data.status === 401 ){
                            this.setState({isLoading:false})
                            this.props.videoErrorAction(res.data)
                           
                        }
                    })
                   
                }
            })
            .catch(error => {
                console.log(error)
            }
            )
    }
    dateFilterHandler = () => {
        this.setState({
            startPage: 1,
            pageSize: 5,
            page: 0,
            activePage: 1
        }, () => this.getReports(localStorage.getItem('token')))
    }

    clearFilterHandler = () => {
        this.setState({
            startDate: null, //new Date(), //start date for date search()
            endDate: null, //new Date(), //end date for date search()
            fromDate: null,
            toDate: null,
            startPage: 1,
            pageSize: 5,
            page: 0,
            activePage: 1
        }, () => this.getReports(localStorage.getItem('token')))
    }

    handleChange = ddd => {

        if (ddd === null || ddd === "") {
            this.setState({
                startDate: null,
                fromDate: null,
                toDate: null
            });
        } else {
            // let h = (d1.getUTCHours().toString().length === 1) ? ('0' + d1.getUTCHours()) : d1.getUTCHours();
            // let m = (d1.getUTCMinutes().toString().length === 1) ? ('0' + d1.getUTCMinutes()) : d1.getUTCMinutes();
            // let s = (d1.getUTCSeconds().toString().length === 1) ? ('0' + d1.getUTCSeconds()) : d1.getUTCSeconds();

            let date = new Date(ddd);

            let dd = (date.getUTCDate().toString().length === 1) ? ('0' + date.getUTCDate()) : date.getUTCDate();
            let mm = (date.getUTCMonth().toString().length === 1) ? ('0' + (date.getUTCMonth() + 1)) : (date.getUTCMonth() + 1);
            let yy = (date.getUTCFullYear().toString().length === 1) ? ('0' + date.getUTCFullYear()) : date.getUTCFullYear();
            
           let fromDate = yy + "-" + mm + "-" + dd + " " + "18" + ":" + "30" + ":" + "00";
            let endDate = this.state.endDate;
            let toDate = this.state.toDate;
            if (date > endDate && endDate != null) {
                endDate = date;
                toDate = fromDate
            }
            this.setState({
                startDate: date,
                endDate,
                fromDate,
                toDate
            });
        }
    };

    handleChange1 = ddd => {
        
        if (ddd === null || ddd === "") {
            this.setState({
                endDate: null,
                toDate: null
            });
        } else {
            let date = new Date(ddd);
            // let h = (d1.getUTCHours().toString().length === 1) ? ('0' + d1.getUTCHours()) : d1.getUTCHours();
            // let m = (d1.getUTCMinutes().toString().length === 1) ? ('0' + d1.getUTCMinutes()) : d1.getUTCMinutes();
            // let s = (d1.getUTCSeconds().toString().length === 1) ? ('0' + d1.getUTCSeconds()) : d1.getUTCSeconds();

            
            let dd = (date.getDate().toString().length === 1) ? ('0' + date.getDate()) : date.getDate();
            let mm = (date.getMonth().toString().length === 1) ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
            let yy = (date.getFullYear().toString().length === 1) ? ('0' + date.getFullYear()) : date.getFullYear();

            let toDate = yy + "-" + mm + "-" + dd + " " + "18" + ":" + "29" + ":" + "59";

            this.setState({
                endDate: date,
                toDate
            });
        }

    };
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.loginToken !== this.props.loginToken) {
            if (this.props.loginToken.res.data.status === 200) {
                this.getReports(this.props.loginToken.res.data.data.token)
            }
        }
    }

    render() {
        let {videoNotFound, videoErrorMessage, buttonDisabled, logList, logCount, isLoading, pageSize, itemPerPage, totalItem, totalPage, startPage, startDate, endDate, previous, next, isFirst, isLast, activePage } = this.state;
        totalPage = Math.ceil(totalItem / itemPerPage);
        let firstRecord = activePage === 1 ? activePage : ((activePage * itemPerPage) - itemPerPage) + 1;
        let dummy = activePage * itemPerPage;
        let lastRecord = (dummy >= totalItem) ? totalItem : dummy;
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
                    <div className="reports-grid">
                        <div class="search" >
                            <div className="datepicker-cont">
                                <div className="dp-block">
                                    <span>From</span>
                                    {/* <DatePicker
                                        selected={this.state.startDate}
                                        onChange={this.handleChange}
                                        maxDate={new Date()}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="yyyy/MM/dd HH:mm"
                                        placeholderText="YYYY/MM/DD HH:MM"
                                    /> */}
                                     <DatePicker
                                        selected={this.state.startDate}
                                        onChange={this.handleChange}
                                        maxDate={new Date()}
                                        dateFormat="yyyy/MM/dd"
                                        placeholderText="YYYY/MM/DD"
                                    />
                                </div>
                                <div className="dp-block">
                                    <span>To</span>
                                    <DatePicker
                                        dateFormat="yyyy/MM/dd"
                                        placeholderText="YYYY/MM/DD"
                                        selected={this.state.endDate}
                                        onChange={this.handleChange1}
                                        minDate={this.state.startDate}
                                        maxDate={new Date()}
                                    />
                                </div>
                                <button className={startDate === null || endDate === null ? "disable-filter" : "fillter-btn"} onClick={startDate === null || endDate === null ? "" : () => this.dateFilterHandler()}>Filter</button>
                                <button className={startDate === null && endDate === null ? "disable-filter" : "fillter-btn"} onClick={startDate === null && endDate === null ? "" : () => this.clearFilterHandler()} >Clear</button>
                            </div>
                            <form onSubmit={this.onSubmitHandler}>
                                <input type="text" placeholder="Agent / Customer Name" onChange={(e) => this.searchHandler(e)} />
                                <button className="search-btn" type="submit">Search</button>
                                {/* onClick={()=>this.getReports(localStorage.getItem('token'))} */}
                            </form>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        Agent<i className="sort" onClick={() => this.sortHandler("agentSort")}><Sort /></i>
                                    </th>
                                    <th>
                                        Customer<i className="sort" onClick={() => this.sortHandler("customerSort")}><Sort /></i>
                                    </th>
                                    <th>
                                        Date & Time <i className="sort" onClick={() => this.sortHandler("dateSort")}><Sort /></i>
                                    </th>
                                    <th>
                                        Duration
                                    </th>
                                    <th>
                                        Call Type
                                    </th>
                                    <th>
                                        Recording
                                    </th>
                                </tr>
                            </thead>
                            {logCount <= 0 ?
                                <tbody>
                                    <tr className="no-record" >
                                        <td colSpan="6">
                                            <Norecords />
                                            <p>No records found</p>
                                        </td>
                                    </tr>
                                </tbody>
                                :
                                <tbody>
                                    {logList.map((log, index) => {
                                        let date = this.convertUTCDateToLocalDate(new Date(log.createdAt))
                                        return <tr key={index}>
                                            <td>{log.toUser ? log.toUser : 'Not available'}</td>
                                            <td>{log.fromUser ? log.fromUser : "Not available"}</td>
                                            {/* <td>{this.getCallDate(log.createdAt)}</td> */}
                                            {/* <td>{this.getCallDate("2020-04-16T18:33:09")}</td> */}
                                             <td>{date.toLocaleString().replace(/^(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2})/, '$1/$2/$3 $4:$5')}</td>
                                            <td>{this.getDuration(log.duration)}</td>
                                            <td>{log.status === '0' ? "Missed Call" : "Attended"}</td>
                                            <td class="report">{log.callId === '' ? "No Records Found" :
                                                <Report onClick={() => this.downloadFileHandler(log.callId)} />
                                            }
                                                <a href="" id="downloadLink" />
                                            </td>
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
            </>
        );
    }
}

export default Reports;