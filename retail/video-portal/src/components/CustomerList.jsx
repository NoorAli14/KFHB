import React from "react";
import "react-tabs/style/react-tabs.css";
import { ReactComponent as Leftarrow } from '../assets/images/leftarrow.svg';
import { ReactComponent as Rightarrow } from '../assets/images/rightarrow.svg';
import { ReactComponent as Sort } from '../assets/images/sorting.svg';
import Loader from "./Loader";
import "../assets/scss/style.scss";
import { ReactComponent as Norecords } from '../assets/images/norecord.svg';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CustomerList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            audioRingToneStatus: false,
            users: [],
            alreadyOnCall: false,
            isLoading: false,
            page: 1, //page number for search query default=1
            mobileNumber: null, //mobile number search string default=null
            nationalId: null, //national id search string default=null
            pageSize: 5, //number of pages to be displayed in pagination default=5
            itemPerPage: 5, //item count per page default=5
            startDate: null, //new Date(), //start date for date search()
            endDate: null, //new Date(), //end date for date search()
            fromDate: null,
            toDate: null,
            totalItem: 0, //default=0
            totalPage: 0, //default=0,
            previous: null,
            next: null,
            isFirst: true,
            isLast: false,
            startPage: 1, //for looping to append paginations default=1
            sortOrder: null,
            activePage: 1,
            buttonDisabled: false
        }
        this.makeCall = this.makeCall.bind(this);
        this.getCustomerList = this.getCustomerList.bind(this);
        this.closeAlert = this.closeAlert.bind(this);

        //pagination, searching, sorting
        this.pageSizeHandler = this.pageSizeHandler.bind(this);
        this.paginationHandler = this.paginationHandler.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        this.sortHandler = this.sortHandler.bind(this);
        this.nextprevHandler = this.nextprevHandler.bind(this);
        this.convertTime = this.convertTime.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);

    }

    componentDidMount() {
        if (localStorage.getItem("callStatus") === null) {
            let elt = document.getElementById("video-popup");
            let videoControlEle = document.getElementById("videocall-controls-overlay");
            elt.style.visibility = "hidden";
            videoControlEle.style.visibility = "hidden";
        }
        this.getCustomerList(localStorage.getItem('access-token'));
    }
    getCustomerList(token) {

        let { page, itemPerPage, nationalId, mobileNumber, sortOrder, fromDate, toDate, activePage } = this.state;

        let config = {
            headers: {
                'x-trans-id': "{{$guid}}",
                'Content-Type': 'application/json',
                'x-access-token': token,
                'x-channel-id': 'CDT-SIT',
            }
        }
        this.setState({
            isLoading: true,
            buttonDisabled: true
        })
        if (nationalId === "") {
            nationalId = null
        }
        if (mobileNumber === "") {
            mobileNumber = null
        }
        axios.post(window._env_.REACT_APP_LOGIN_API + '/cb/bs/customer/list/1.0', { data: null }, {
            params: {
                page: activePage, limit: itemPerPage, nationalId, mobileNumber, sort: sortOrder, from: fromDate, to: toDate
            }, headers: {
                'x-trans-id': "{{$guid}}",
                'Content-Type': 'application/json',
                'x-access-token': token,
                'x-channel-id': 'CDT-SIT',
            }
        })
            .then(res => {
                if (res.data.response !== undefined) {
                    let result = res.data.response
                    this.setState({
                        isLoading: false,
                        buttonDisabled: false,
                        users: result.customers,
                        itemPerPage: result.pagination.perPage,
                        totalItem: result.pagination.total,
                        totalPage: result.pagination.pages,
                        activePage: result.pagination.current,
                        previous: result.pagination.previous,
                        next: result.pagination.next,
                        isFirst: result.pagination.isFirst,
                        isLast: result.pagination.isLast,
                    })
                } else if (res.data.exception !== undefined) {
                    console.log("something went wrong please try again")
                    this.setState({
                        isLoading: false
                    })
                }
            })
            .catch(err => {
                console.log("something went wrong please try again")
                this.setState({
                    isLoading: false
                })
            })
    }

    paginationHandler(e, id) {
        this.setState({
            page: id,
            activePage: id
        }, () => this.getCustomerList(localStorage.getItem('access-token')))
    }

    pageSizeHandler(e) {
        this.setState({
            itemPerPage: e.target.value,
            startPage: 1,
            pageSize: 5,
            page: 1,
            activePage: 1
        }, () => this.getCustomerList(localStorage.getItem('access-token')))

    }

    searchHandler(e, type) {
        if (type === "mobile") {
            this.setState({
                mobileNumber: e.target.value
            }, () => {
                let { mobileNumber } = this.state
                if (mobileNumber.length === 0 || mobileNumber.length >= 4) {
                    this.getCustomerList(localStorage.getItem('access-token'))
                }
            })
        } else if (type === "nid") {
            this.setState({
                nationalId: e.target.value
            }, () => {
                let { nationalId } = this.state
                if (nationalId.length === 0 || nationalId.length >= 4) {
                    this.getCustomerList(localStorage.getItem('access-token'))
                }
            })
        }

        // this.setState({
        //     search: e.target.value
        //     },() => {
        //         let { search } = this.state
        //         if(search.length === 0){
        //             this.getCustomerList(localStorage.getItem('access-token'))
        //         }
        //     })
    }

    sortHandler() {
        this.setState({
            sortOrder: this.state.sortOrder === null ? "asc" : (this.state.sortOrder === "asc" ? "desc" : "asc")
        }, () => this.getCustomerList(localStorage.getItem('access-token')))
    }

    onSubmitHandler() {
        this.setState({
            startPage: 1,
            pageSize: 5,
            page: 1,
            activePage: 1
        }, () => this.getCustomerList(localStorage.getItem('access-token')))

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
                    }, () => this.getCustomerList(localStorage.getItem('token')))
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
                }, () => this.getCustomerList(localStorage.getItem('token')))
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
                    }, () => this.getCustomerList(localStorage.getItem('token')))
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
                }, () => this.getCustomerList(localStorage.getItem('token')))
            }
        }
    }

    convertTime(time) {
        var dateStr = time;
        var dateObj = new Date(dateStr);

        // var dateFormat = dateObj.toLocaleDateString();
        // var timeFormat = dateObj.toLocaleTimeString();

            let h = (dateObj.getUTCHours().toString().length === 1) ? ('0' + dateObj.getUTCHours()) : dateObj.getUTCHours();
            let m = (dateObj.getUTCMinutes().toString().length === 1) ? ('0' + dateObj.getUTCMinutes()) : dateObj.getUTCMinutes();
            let s = (dateObj.getUTCSeconds().toString().length === 1) ? ('0' + dateObj.getUTCSeconds()) : dateObj.getUTCSeconds();
            let dd = (dateObj.getUTCDate().toString().length === 1) ? ('0' + dateObj.getUTCDate()) : dateObj.getUTCDate();
            let mm = (dateObj.getUTCMonth().toString().length === 1) ? ('0' + (dateObj.getUTCMonth() + 1)) : (dateObj.getUTCMonth() + 1);
            let yy = (dateObj.getUTCFullYear().toString().length === 1) ? ('0' + dateObj.getUTCFullYear()) : dateObj.getUTCFullYear();
              
            var dateFormat = dd + "/" + mm + "/" + yy;
            var timeFormat = h + ":" + m + ":" + s;

        return (dateFormat + " " + timeFormat);
    }

    makeCall(type, user) {
        const self = this;

        if (localStorage.getItem('callStatus') === "ON_GOING" || localStorage.getItem('actionType') === "RECEIVE_CALL") {
            this.setState({
                alreadyOnCall: true
            })
        }
        else {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(res => {
                    const stream = res;
                    localStorage.setItem('callerSocketId', user)
                    localStorage.setItem('type', type)
                    self.setState({ audioRingToneStatus: true });
                    localStorage.setItem('actionType', 'MAKE_CALL');
                    localStorage.setItem('callType', 'video');
                    self.props.startInitializeCall(type);
                    stream.getTracks().forEach(function (track) {
                        track.stop();
                    });
                })
                .catch(err => {
                    self.props.requestCameraPermission("NO_CAMERA")
                })
        }
    }

    closeAlert() {
        this.setState({
            alreadyOnCall: false
        })
    }

    clearFilterHandler = () => {
        this.setState({
            startDate: null, //new Date(), //start date for date search()
            endDate: null, //new Date(), //end date for date search()
            fromDate: null,
            toDate: null,
            startPage: 1,
            pageSize: 5,
            page: 1,
            activePage: 1
        }, () => this.getCustomerList(localStorage.getItem('access-token')))
    }

    handleChange = ddd => {
        if (ddd === null || ddd === "") {
            this.setState({
                startDate: null,
                fromDate: null,
                toDate: null
            });
        } else {
            
            // let h = (date.getUTCHours().toString().length === 1) ? ('0' + date.getUTCHours()) : date.getUTCHours();
            // let m = (date.getUTCMinutes().toString().length === 1) ? ('0' + date.getUTCMinutes()) : date.getUTCMinutes();
            // let s = (date.getUTCSeconds().toString().length === 1) ? ('0' + date.getUTCSeconds()) : date.getUTCSeconds();
            // let dd = (date.getUTCDate().toString().length === 1) ? ('0' + date.getUTCDate()) : date.getUTCDate();
            // let mm = (date.getUTCMonth().toString().length === 1) ? ('0' + (date.getUTCMonth() + 1)) : (date.getUTCMonth() + 1);
            // let yy = (date.getUTCFullYear().toString().length === 1) ? ('0' + date.getUTCFullYear()) : date.getUTCFullYear();
            
            let  date = new Date(ddd);
            let dd = (date.getDate().toString().length === 1) ? ('0' + date.getDate()) : date.getDate();
            let mm = (date.getMonth().toString().length === 1) ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
            let yy = (date.getFullYear().toString().length === 1) ? ('0' + date.getFullYear()) : date.getFullYear();

            
            let fromDate = yy + "/" + mm + "/" + dd //+ " " + h + ":" + m + ":" + s;
            
            let endDate = this.state.endDate;
            let toDate = this.state.toDate;

            if (date > endDate && endDate !== null) {
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
            let  date = new Date(ddd);
            let dd = (date.getDate().toString().length === 1) ? ('0' + date.getDate()) : date.getDate();
            let mm = (date.getMonth().toString().length === 1) ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
            let yy = (date.getFullYear().toString().length === 1) ? ('0' + date.getFullYear()) : date.getFullYear();

            let toDate = yy + "/" + mm + "/" + dd //+ " " + h + ":" + m + ":" + s;

            this.setState({
                endDate: date,
                toDate
            });
        }
    };

    render() {

        let { audioRingToneStatus, alreadyOnCall } = this.state;
        let { buttonDisabled, users, isLoading, pageSize, itemPerPage, totalItem, totalPage, startPage, previous, next, isFirst, isLast, activePage, startDate, endDate } = this.state;
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
            // <>
            //     {alreadyOnCall && <OnAnotherCall closeHandler={this.closeAlert} />}
            //     <div className="grid-container">
            //         {audioRingToneStatus && <RingTone audioSrc={CallReceiveTone} />}
            //         <div className="customer-list">
            //             <h4>Customer List</h4>
            //             <ul>
            //                 {this.state.users.map((user, index) => {
            //                     return <li key={index}>
            //                        <span>{user}</span>
            //                         <div>
            //                             <a href="#" className="audiocall-btn" onClick={() => this.makeCall("audio", user)}>
            //                                 <i><Audiocallicon /></i>
            //                                 <span>Audio Call</span>
            //                             </a>
            //                             <a href="#" className="videocall-btn" onClick={() => this.makeCall("video", user)}>
            //                                 <i><Videocallicon /></i>
            //                                 <span>Video Call</span>
            //                             </a>
            //                         </div>
            //                     </li>
            //                 })}
            //             </ul>
            //         </div>
            //     </div>
            // </>
            <>{isLoading && <Loader />}
                <div className="grid-container">
                    <div className="reports-grid">
                        {/* <div class="search" >
                         <form onSubmit={this.onSubmitHandler}>
                            <input type="text" placeholder="National Id " onChange={(e) => this.searchHandler(e)}/>
                            <button type="submit" >Search</button>
                        </form>
                        </div> */}
                        <div className="datepicker-cont">
                            <div className="dp-block">
                                <span>From</span>
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                                    maxDate={new Date()}
                                    dateFormat="yyyy/MM/dd "
                                    placeholderText="YYYY/MM/DD"
                                />
                            </div>
                            <div className="dp-block">
                                <span>To</span>
                                {/* <DatePicker
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="yyyy/MM/dd HH:mm"
                                    placeholderText="YYYY/MM/DD HH:MM"
                                    selected={this.state.endDate}
                                    onChange={this.handleChange1}
                                    minDate={this.state.startDate}
                                    maxDate={new Date()}
                                /> */}
                                <DatePicker
                                    showTimeSelect
                                    dateFormat="yyyy/MM/dd"
                                    placeholderText="YYYY/MM/DD"
                                    selected={this.state.endDate}
                                    onChange={this.handleChange1}
                                    minDate={this.state.startDate}
                                    maxDate={new Date()}
                                />
                            </div>
                            <button className={startDate === null || endDate === null ? "disable-filter" : "fillter-btn"} onClick={startDate === null || endDate === null ? "" : () => this.onSubmitHandler()}>Filter</button>
                            <button className={startDate === null && endDate === null ? "disable-filter" : "fillter-btn"} onClick={startDate === null && endDate === null ? "" : () => this.clearFilterHandler()} >Clear</button>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        System ID
                                    </th>
                                    <th>
                                        First Name
                                    </th>
                                    <th>
                                        Last Name
                                    </th>
                                    <th>
                                        Mobile No
                                    </th>
                                    <th>
                                        National ID
                                    </th>
                                    <th>
                                        Last Onboarding Step
                                    </th>
                                    <th>
                                        Created On <i className="sort" onClick={this.sortHandler}><Sort /></i>
                                    </th>
                                    <th>
                                        Updated On
                                    </th>
                                </tr>
                                <tr>
                                    <th>

                                    </th>
                                    <th>

                                    </th>
                                    <th>

                                    </th>
                                    <th>
                                        <div class="search" >
                                            <input type="text" placeholder="Mobile No " onChange={(e) => this.searchHandler(e, "mobile")} />
                                        </div>
                                    </th>
                                    <th>
                                        <div class="search" >
                                            <input type="text" placeholder="National Id" onChange={(e) => this.searchHandler(e, "nid")} />
                                        </div>
                                    </th>
                                    <th>

                                    </th>
                                    <th>

                                    </th>
                                    <th>

                                    </th>
                                </tr>
                            </thead>
                            {this.state.users.length <= 0 ?
                                <tbody>
                                    <tr className="no-record" >
                                        <td colSpan="8">
                                            <Norecords />
                                            <p>No records found</p>
                                        </td>
                                    </tr>
                                </tbody>
                                : <tbody>
                                    {users.map(user => {
                                        return <tr>
                                            <td>{user.id ? user.id : "Not Available"}</td>
                                            <td>{user.firstName ? user.firstName : "Not Available"}</td>
                                            <td>{user.lastName ? user.lastName : "Not Available"}</td>
                                            <td>{user.mobileNumber ? user.mobileNumber : "Not Available"}</td>
                                            <td>{user.nationalId ? user.nationalId : "Not Available"}</td>
                                            <td>{user.lastStep ? user.lastStep : "Not Available"}</td>
                                            <td>{user.audit.createdOn ? this.convertTime(user.audit.createdOn) : "Not Available"}</td>
                                            <td>{user.audit.updatedOn ? this.convertTime(user.audit.createdOn) : "Not Available"}</td>
                                        </tr>
                                    })}
                                </tbody>}
                        </table>
                        {pageSize <= 0 ?
                            <></>
                            :
                            <div className="table-footer">
                                <div>
                                    <span>Showing: &nbsp; {firstRecord}-{lastRecord} of {totalItem} &nbsp;&nbsp; </span>
                                </div>
                                <div>
                                    <span>Show</span>
                                    <select name="" id="" onChange={(e) => this.pageSizeHandler(e)}>
                                        <option value={25} selected>25</option>
                                        <option value={50}>50</option>
                                        <option value={75}>75</option>
                                        <option value={100}>100</option>
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

export default CustomerList;